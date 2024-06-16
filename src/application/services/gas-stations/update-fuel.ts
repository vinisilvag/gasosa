import { prisma } from '@/infra/database/prisma/client'
import { type Fuel } from '@prisma/client'

import { selectFuel } from '@/utils/select-fuel'

import { FuelNotFound } from '@/application/errors/gas-stations/fuel-not-found'
import { NotOwnerOfTheFuel } from '@/application/errors/gas-stations/not-owner-of-the-fuel'

interface UpdateFuelRequest {
  newName: string
  newPrice: number
  gasStationId: number
  fuelId: number
}

interface UpdateFuelResponse {
  fuel: Omit<Fuel, 'gasStationId'>
}

export class UpdateFuel {
  async execute({
    newName,
    newPrice,
    gasStationId,
    fuelId
  }: UpdateFuelRequest): Promise<UpdateFuelResponse> {
    const fuel = await prisma.fuel.findUnique({
      where: {
        id: fuelId
      }
    })

    if (!fuel) throw new FuelNotFound()

    if (fuel.gasStationId !== gasStationId) {
      throw new NotOwnerOfTheFuel()
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

    return { fuel: updatedFuel }
  }
}
