import { type Request, type Response } from 'express'
import { getDistance } from 'geolib'
import { AppError } from '@helpers/app-error'

import { prisma } from '@database/prisma'
import { z } from 'zod'

import { hash } from 'bcrypt'

import { selectGasStation } from '@utils/select-gas-station'
import { selectFuel } from '@utils/select-fuel'

const filterPerNamesQuery = z.object({
  gasStationName: z.string().default(''),
  fuelName: z.string().default('')
})

const filterPerDistanceQuery = z.object({
  userLatitude: z.coerce.number(),
  userLongitude: z.coerce.number()
})

const showGasStationParams = z.object({
  gasStationId: z.coerce.number()
})

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

const updateFuelBody = z.object({
  newName: z.string(),
  newPrice: z.number()
})

const fuelParams = z.object({
  fuelId: z.coerce.number()
})

export class GasStationController {
  public async filterPerNames(request: Request, response: Response) {
    const { gasStationName, fuelName } = filterPerNamesQuery.parse(
      request.query
    )

    const gasStations = await prisma.gasStation.findMany({
      select: selectGasStation(true),
      where: {
        ...(gasStationName && { name: { contains: gasStationName } }),
        ...(fuelName && { fuels: { some: { name: { contains: fuelName } } } })
      }
    })

    return response.status(200).json({ gasStations })
  }

  public async filterPerDistance(request: Request, response: Response) {
    const { userLatitude, userLongitude } = filterPerDistanceQuery.parse(
      request.query
    )

    const gasStations = await prisma.gasStation.findMany({
      select: selectGasStation(true)
    })

    const userCoords = {
      latitude: userLatitude,
      longitude: userLongitude
    }

    gasStations.sort((a, b) => {
      const distanceA = getDistance(userCoords, {
        latitude: a.latitude,
        longitude: a.longitude
      })
      const distanceB = getDistance(userCoords, {
        latitude: b.latitude,
        longitude: b.longitude
      })
      return distanceA - distanceB
    })

    return response.status(200).json({ gasStations })
  }

  public async show(request: Request, response: Response) {
    const { gasStationId } = showGasStationParams.parse(request.params)

    const gasStation = await prisma.gasStation.findUnique({
      where: { id: gasStationId },
      select: selectGasStation(true)
    })

    if (gasStation) {
      response.status(200).json({ gasStation })
    } else {
      throw new AppError(404, 'Gas station not found.')
    }
  }

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
        },
        select: selectGasStation(false)
      })

      return response.status(201).json({ gasStation })
    } else {
      throw new AppError(409, 'Email already registered.')
    }
  }

  public async delete(request: Request, response: Response) {
    const { id: gasStationId } = request.session

    const gasStation = await prisma.gasStation.findUnique({
      where: { id: gasStationId }
    })

    if (gasStation) {
      await prisma.gasStation.delete({
        where: {
          id: gasStationId
        }
      })
      return response.status(204).send()
    } else {
      throw new AppError(404, 'Gas station not found.')
    }
  }

  public async createFuel(request: Request, response: Response) {
    const { name, price } = createFuelBody.parse(request.body)
    const { id: gasStationId } = request.session

    const gasStation = await prisma.gasStation.findUnique({
      where: { id: gasStationId }
    })

    if (!gasStation) {
      throw new AppError(404, 'Gas station not found.')
    }

    const fuel = await prisma.fuel.create({
      data: {
        name,
        price,
        gasStationId
      },
      select: selectFuel()
    })

    return response.status(201).json({ fuel })
  }

  public async updateFuelPrice(request: Request, response: Response) {
    const { newName, newPrice } = updateFuelBody.parse(request.body)
    const { fuelId } = fuelParams.parse(request.params)
    const { id: gasStationId } = request.session

    const fuel = await prisma.fuel.findUnique({
      where: {
        id: fuelId
      }
    })

    if (!fuel) throw new AppError(404, 'Fuel not found.')

    if (fuel.gasStationId !== gasStationId) {
      throw new AppError(401, 'You are not the owner of this fuel.')
    }

    const updatedFuel = await prisma.fuel.update({
      where: {
        id: fuelId
      },
      data: {
        name: newName,
        price: newPrice
      },
      select: selectFuel()
    })

    return response.status(200).json({ fuel: updatedFuel })
  }

  public async deleteFuel(request: Request, response: Response) {
    const { fuelId } = fuelParams.parse(request.params)
    const { id: gasStationId } = request.session

    const fuel = await prisma.fuel.findUnique({
      where: {
        id: fuelId
      }
    })

    if (!fuel) throw new AppError(404, 'Fuel not found.')

    if (fuel.gasStationId !== gasStationId) {
      throw new AppError(401, 'You are not the owner of this fuel.')
    }

    await prisma.fuel.delete({
      where: {
        id: fuelId
      }
    })

    return response.status(204).send()
  }
}
