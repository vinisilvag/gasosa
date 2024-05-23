import { type Request, type Response } from 'express'
import { AppError } from '@helpers/app-error'

import { prisma } from '@database/prisma'
import { z } from 'zod'

import { hash } from 'bcrypt'

import { selectUser } from '@utils/select-user'
import { selectGasStation } from '@utils/select-gas-station'

const createUserBody = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6)
})

const likeGasStationParams = z.object({
  gasStationId: z.coerce.number()
})

export class UserController {
  public async create(request: Request, response: Response) {
    const { name, email, password } = createUserBody.parse(request.body)

    const userExists = await prisma.user.findUnique({
      where: { email }
    })

    if (!userExists) {
      const hashedPassword = await hash(password, 10)

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword
        },
        select: selectUser()
      })

      return response.status(201).json({ user })
    } else {
      throw new AppError(409, 'Email already registered.')
    }
  }

  public async delete(request: Request, response: Response) {
    const { id: userId } = request.session

    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (user) {
      await prisma.user.delete({
        where: {
          id: userId
        }
      })
      return response.status(204).send()
    } else {
      throw new AppError(404, 'User not found.')
    }
  }

  public async likesList(request: Request, response: Response) {
    const { id: userId } = request.session

    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (user) {
      const likes = await prisma.like.findMany({
        where: { userId },
        select: {
          gasStation: {
            select: selectGasStation(false)
          }
        }
      })
      const filteredLikes = likes.map(like => {
        return {
          ...like.gasStation
        }
      })
      return response.status(200).json({ likes: filteredLikes })
    } else {
      throw new AppError(404, 'User user not found.')
    }
  }

  public async likeGasStation(request: Request, response: Response) {
    const { gasStationId } = likeGasStationParams.parse(request.params)
    const { id: userId } = request.session

    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    const gasStation = await prisma.gasStation.findUnique({
      where: { id: gasStationId }
    })

    if (user) {
      if (gasStation) {
        const like = await prisma.like.findUnique({
          where: { userId_gasStationId: { userId, gasStationId } }
        })

        if (!like) {
          await prisma.like.create({ data: { userId, gasStationId } })
          return response.status(204).send()
        } else {
          throw new AppError(409, 'Gas station already liked.')
        }
      } else {
        throw new AppError(404, 'Gas station not found.')
      }
    } else {
      throw new AppError(404, 'User not found.')
    }
  }

  public async unlikeGasStation(request: Request, response: Response) {
    const { gasStationId } = likeGasStationParams.parse(request.params)
    const { id: userId } = request.session

    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    const gasStation = await prisma.gasStation.findUnique({
      where: { id: gasStationId }
    })

    if (user) {
      if (gasStation) {
        const like = await prisma.like.findUnique({
          where: { userId_gasStationId: { userId, gasStationId } }
        })

        if (like) {
          await prisma.like.delete({
            where: { userId_gasStationId: { userId, gasStationId } }
          })
          return response.status(204).send()
        } else {
          throw new AppError(409, 'Gas station not liked yet.')
        }
      } else {
        throw new AppError(404, 'Gas station not found.')
      }
    } else {
      throw new AppError(404, 'User not found.')
    }
  }
}
