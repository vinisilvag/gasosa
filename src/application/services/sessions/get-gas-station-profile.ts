import { prisma } from '@/infra/database/prisma/client'
import { type GasStation } from '@prisma/client'

import { selectGasStation } from '@/utils/select-gas-station'

import { GasStationNotFound } from '@/application/errors/gas-stations/gas-station-not-found'

interface GetGasStationProfileRequest {
  gasStationId: number
}

interface GetGasStationProfileResponse {
  gasStation: Omit<GasStation, 'password'>
}

export class GetGasStationProfile {
  async execute({
    gasStationId
  }: GetGasStationProfileRequest): Promise<GetGasStationProfileResponse> {
    const gasStation = await prisma.gasStation.findUnique({
      where: { id: gasStationId },
      select: selectGasStation(false)
    })

    if (!gasStation) {
      throw new GasStationNotFound()
    }

    return { gasStation }
  }
}
