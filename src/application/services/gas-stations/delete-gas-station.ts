import { prisma } from '@/infra/database/prisma/client'

import { GasStationNotFound } from '@/application/errors/gas-stations/gas-station-not-found'

interface DeleteGasStationRequest {
  gasStationId: number
}

export class DeleteGasStation {
  async execute({ gasStationId }: DeleteGasStationRequest): Promise<void> {
    const gasStation = await prisma.gasStation.findUnique({
      where: { id: gasStationId }
    })

    if (!gasStation) {
      throw new GasStationNotFound()
    }

    await prisma.gasStation.delete({
      where: {
        id: gasStationId
      }
    })
  }
}
