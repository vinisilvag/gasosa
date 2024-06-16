import { prisma } from '@/infra/database/prisma/client'

import { selectGasStation } from '@/utils/select-gas-station'

import { GasStationNotFound } from '@/application/errors/gas-stations/gas-station-not-found'

interface ShowGasStationRequest {
  gasStationId: number
}

interface ShowGasStationResponse {
  gasStation: any
}

export class ShowGasStation {
  async execute({
    gasStationId
  }: ShowGasStationRequest): Promise<ShowGasStationResponse> {
    const gasStation = await prisma.gasStation.findUnique({
      where: { id: gasStationId },
      select: selectGasStation(true)
    })

    if (!gasStation) {
      throw new GasStationNotFound()
    }

    return { gasStation }
  }
}
