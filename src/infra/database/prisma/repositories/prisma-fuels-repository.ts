import {
  type CreateFuel,
  type UpdateFuel,
  type FuelsRepository
} from '@/application/repositories/fuels-repository'

import { prisma } from '@/infra/database/prisma/client'

export class PrismaFuelsRepository implements FuelsRepository {
  async findById(id: string) {
    return await prisma.fuel.findUnique({ where: { id } })
  }

  async create(data: CreateFuel) {
    const { name, price, gasStationId } = data
    const fuel = await prisma.fuel.create({
      data: {
        name,
        price,
        gasStationId
      }
    })
    return fuel
  }

  async update(data: UpdateFuel) {
    const { name, price, fuelId } = data
    await prisma.fuel.update({
      where: {
        id: fuelId
      },
      data: {
        name,
        price
      }
    })
  }

  async delete(id: string) {
    await prisma.fuel.delete({
      where: {
        id
      }
    })
  }
}
