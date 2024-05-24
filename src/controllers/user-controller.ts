import { type Request, type Response } from 'express'
import { AppError } from '@helpers/app-error'

import { prisma } from '@database/prisma'
import { z } from 'zod'

import { selectGasStation } from '@utils/select-gas-station'

import { UserNotFound } from '@errors/user-not-found'

import { CreateUser } from '@services/users/create-user'

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

    const createUser = new CreateUser()
    const { user } = await createUser.execute({ name, email, password })

    return response.status(201).json({ user })
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
      throw new UserNotFound()
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
      throw new UserNotFound()
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

    if (!user) {
      throw new UserNotFound()
    }

    if (!gasStation) {
      throw new AppError(404, 'Gas station not found.')
    }

    const like = await prisma.like.findUnique({
      where: { userId_gasStationId: { userId, gasStationId } }
    })

    if (!like) {
      throw new AppError(409, 'Gas station not liked yet.')
    }

    await prisma.like.delete({
      where: { userId_gasStationId: { userId, gasStationId } }
    })

    return response.status(204).send()
  }
}
