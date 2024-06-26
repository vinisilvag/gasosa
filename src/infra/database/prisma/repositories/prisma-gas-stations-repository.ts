import {
  type CreateGasStation,
  type GasStationsRepository
} from '@/application/repositories/gas-stations-repository'

import { prisma } from '@/infra/database/prisma/client'

export class PrismaGasStationsRepository implements GasStationsRepository {
  async findMany() {
    return await prisma.gasStation.findMany({})
  }

  async findManyPerName(gasStationName: string, fuelName: string) {
    return await prisma.gasStation.findMany({
      where: {
        ...(gasStationName && { name: { contains: gasStationName } }),
        ...(fuelName && { fuels: { some: { name: { contains: fuelName } } } })
      }
    })
  }

  async findById(id: number) {
    return await prisma.gasStation.findUnique({ where: { id } })
  }

  async findByEmail(email: string) {
    return await prisma.gasStation.findUnique({ where: { email } })
  }

  async create(data: CreateGasStation) {
    const { name, email, password, latitude, longitude } = data

    const gasStation = await prisma.gasStation.create({
      data: {
        name,
        email,
        password,
        latitude,
        longitude
      }
    })

    return gasStation
  }

  async delete(id: number) {}
}
