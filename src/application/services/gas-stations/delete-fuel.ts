import { prisma } from '@/infra/database/prisma/client'

import { FuelNotFound } from '@/application/errors/gas-stations/fuel-not-found'
import { NotOwnerOfTheFuel } from '@/application/errors/gas-stations/not-owner-of-the-fuel'

interface DeleteFuelRequest {
  fuelId: number
  gasStationId: number
}

export class DeleteFuel {
  async execute({ fuelId, gasStationId }: DeleteFuelRequest): Promise<void> {
    const fuel = await prisma.fuel.findUnique({
      where: {
        id: fuelId
      }
    })

    if (!fuel) throw new FuelNotFound()

    if (fuel.gasStationId !== gasStationId) {
      throw new NotOwnerOfTheFuel()
    }

    await prisma.fuel.delete({
      where: {
        id: fuelId
      }
    })
  }
}
