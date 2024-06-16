import { prisma } from '@/infra/database/prisma/client'
import { type Fuel } from '@prisma/client'

import { selectFuel } from '@/utils/select-fuel'

import { GasStationNotFound } from '@/application/errors/gas-stations/gas-station-not-found'

interface CreateFuelRequest {
  name: string
  price: number
  gasStationId: number
}

interface CreateFuelResponse {
  fuel: Omit<Fuel, 'gasStationId'>
}

export class CreateFuel {
  async execute({
    name,
    price,
    gasStationId
  }: CreateFuelRequest): Promise<CreateFuelResponse> {
    const gasStation = await prisma.gasStation.findUnique({
      where: { id: gasStationId }
    })

    if (!gasStation) {
      throw new GasStationNotFound()
    }

    const fuel = await prisma.fuel.create({
      data: {
        name,
        price,
        gasStationId
      },
      select: selectFuel()
    })

    return { fuel }
  }
}
