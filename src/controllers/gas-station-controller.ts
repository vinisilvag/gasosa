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
  longitude: z.number(),
  gasPrice: z.number()
})

const listGasStationsQuery = z.object({
  filter: z.string().default('')
})

export class GasStationController {
  public async create(request: Request, response: Response) {
    const { name, email, password, latitude, longitude, gasPrice } =
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
          longitude,
          gasPrice
        }
      })

      return response
        .status(201)
        .json({ gasStation: GasStationViewModel.toHTTP(gasStation) })
    } else {
      throw new AppError(409, 'Email already registered.')
    }
  }

  public async gasStationsPerName(request: Request, response: Response) {
    const { filter } = listGasStationsQuery.parse(request.query)

    const gasStations = await prisma.gasStation.findMany({
      where: { name: { contains: filter } }
    })

    return response.status(200).json({
      gasStations: gasStations.map(gasStation =>
        GasStationViewModel.toHTTP(gasStation)
      )
    })
  }
}
