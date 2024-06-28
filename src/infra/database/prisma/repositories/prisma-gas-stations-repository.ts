import {
  type CreateGasStation,
  type GasStationsRepository
} from '@/application/repositories/gas-stations-repository'

import { prisma } from '@/infra/database/prisma/client'

export class PrismaGasStationsRepository implements GasStationsRepository {
  async findMany() {
    return await prisma.gasStation.findMany({
      include: { fuels: true }
    })
  }

  async findManyPerName(gasStationName: string, fuelName: string) {
    return await prisma.gasStation.findMany({
      include: { fuels: true },
      where: {
        ...(gasStationName && { name: { contains: gasStationName } }),
        ...(fuelName && { fuels: { some: { name: { contains: fuelName } } } })
      }
    })
  }

  async findById(id: string) {
    return await prisma.gasStation.findUnique({
      where: { id },
      include: { fuels: true }
    })
  }

  async findByEmail(email: string) {
    return await prisma.gasStation.findUnique({
      where: { email },
      include: { fuels: true }
    })
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
      },
      include: { fuels: true }
    })
    return gasStation
  }

  async delete(id: string) {
    await prisma.gasStation.delete({
      where: {
        id
      }
    })
  }
}
