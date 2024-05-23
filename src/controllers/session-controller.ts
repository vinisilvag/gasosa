import { type Request, type Response } from 'express'
import { AppError } from '@helpers/app-error'

import { prisma } from '@database/prisma'
import { z } from 'zod'

import { compare } from 'bcrypt'

import { SECRET } from '@config/env/auth'
import { sign } from 'jsonwebtoken'

import { selectUser } from '@utils/select-user'
import { selectGasStation } from '@utils/select-gas-station'

export const authenticateBody = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export class SessionController {
  public async authenticateUser(request: Request, response: Response) {
    const { email, password } = authenticateBody.parse(request.body)

    const user = await prisma.user.findUnique({ where: { email } })

    if (user) {
      const passwordMatch = await compare(password, user.password)

      if (passwordMatch) {
        const token = sign({ id: user.id }, SECRET, {
          expiresIn: '7d'
        })
        const { password, ...userWithoutPassword } = user
        return response.status(200).json({ user: userWithoutPassword, token })
      } else {
        throw new AppError(401, 'Invalid email/password combination.')
      }
    } else {
      throw new AppError(404, 'User not found.')
    }
  }

  public async userProfile(request: Request, response: Response) {
    const { id: userId } = request.session

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: selectUser()
    })

    if (user) {
      return response.status(200).json({ user })
    } else {
      throw new AppError(404, 'User not found.')
    }
  }

  public async authenticateGasStation(request: Request, response: Response) {
    const { email, password } = authenticateBody.parse(request.body)

    const gasStation = await prisma.gasStation.findUnique({ where: { email } })

    if (gasStation) {
      const passwordMatch = await compare(password, gasStation.password)

      if (passwordMatch) {
        const token = sign({ id: gasStation.id }, SECRET, {
          expiresIn: '7d'
        })
        const { password, ...gasStationWithoutPassword } = gasStation
        return response
          .status(200)
          .json({ gasStation: gasStationWithoutPassword, token })
      } else {
        throw new AppError(401, 'Invalid email/password combination.')
      }
    } else {
      throw new AppError(404, 'Gas station not found.')
    }
  }

  public async gasStationProfile(request: Request, response: Response) {
    const { id: gasStationId } = request.session

    const gasStation = await prisma.gasStation.findUnique({
      where: { id: gasStationId },
      select: selectGasStation(false)
    })

    if (gasStation) {
      return response.status(200).json({ gasStation })
    } else {
      throw new AppError(404, 'Gas station not found.')
    }
  }
}
