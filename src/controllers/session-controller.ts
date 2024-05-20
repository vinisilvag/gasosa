import { type Request, type Response } from 'express'
import { AppError } from '@helpers/app-error'

import { prisma } from '@database/prisma'
import { z } from 'zod'

import { compare } from 'bcrypt'

import { SECRET } from '@config/env/auth'
import { sign } from 'jsonwebtoken'
import { GasStationViewModel } from '@view-models/gas-station-view-model'

export const authenticateUserBody = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export class SessionController {
  public async index(request: Request, response: Response) {
    const { id: userId } = request.user

    const gasStation = await prisma.gasStation.findUnique({
      where: { id: userId }
    })

    if (gasStation) {
      return response
        .status(200)
        .json({ gasStation: GasStationViewModel.toHTTP(gasStation) })
    } else {
      throw new AppError(404, 'Gas station not found.')
    }
  }

  public async authenticate(request: Request, response: Response) {
    const { email, password } = authenticateUserBody.parse(request.body)

    const gasStation = await prisma.gasStation.findUnique({ where: { email } })

    if (gasStation) {
      const passwordMatch = await compare(password, gasStation.password)

      if (passwordMatch) {
        const token = sign({ id: gasStation.id }, SECRET, {
          expiresIn: '7d'
        })

        return response
          .status(200)
          .json({ gasStation: GasStationViewModel.toHTTP(gasStation), token })
      } else {
        throw new AppError(401, 'Invalid email/password combination.')
      }
    } else {
      throw new AppError(404, 'Gas station not found.')
    }
  }
}
