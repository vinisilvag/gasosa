import { type Request, type Response } from 'express'
import { AppError } from '@helpers/app-error'

import { prisma } from '@database/prisma'
import { z } from 'zod'

import { hash } from 'bcrypt'
import { GasStationViewModel } from '@view-models/gas-station-view-model'

const createGasStationBody = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  latitude: z.number(),
  longitude: z.number()
})

const createFuelBody = z.object({
  name: z.string(),
  price: z.number()
})

export class GasStationController {
  public async create(request: Request, response: Response) {
    const { name, email, password, latitude, longitude } =
      createGasStationBody.parse(request.body)

    const gasStationExists = await prisma.gasStation.findUnique({
      where: { email }
    })

    if (!gasStationExists) {
      const hashedPassword = await hash(password, 10)

      const gasStation = await prisma.gasStation.create({
        data: {
          name,
          email,
          password: hashedPassword,
          latitude,
          longitude
        }
      })

      return response
        .status(201)
        .json({ gasStation: GasStationViewModel.toHTTP(gasStation) })
    } else {
      throw new AppError(409, 'Email already registered.')
    }
  }

  public async createFuel(request: Request, response: Response) {
    const { name, price } = createFuelBody.parse(request.body)
    const { id: gasStationId } = request.session

    const gasStation = await prisma.gasStation.findUnique({
      where: { id: gasStationId }
    })

    if (!gasStation) {
      throw new AppError(404, 'Authenticated gas station not found.')
    }

    // criar o combustível aqui
  }
}
