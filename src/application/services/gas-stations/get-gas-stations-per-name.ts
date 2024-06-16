import { prisma } from '@/infra/database/prisma/client'

import { selectGasStation } from '@/utils/select-gas-station'

interface GetGasStationsPerNameRequest {
  gasStationName: string
  fuelName: string
}

interface GetGasStationsPerNameResponse {
  gasStations: any[]
}

export class GetGasStationsPerName {
  async execute({
    gasStationName,
    fuelName
  }: GetGasStationsPerNameRequest): Promise<GetGasStationsPerNameResponse> {
    const gasStations = await prisma.gasStation.findMany({
      select: selectGasStation(true),
      where: {
        ...(gasStationName && { name: { contains: gasStationName } }),
        ...(fuelName && { fuels: { some: { name: { contains: fuelName } } } })
      }
    })

    return { gasStations }
  }
}
