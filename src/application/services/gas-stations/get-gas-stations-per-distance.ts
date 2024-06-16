import { prisma } from '@/infra/database/prisma/client'

import { selectGasStation } from '@/utils/select-gas-station'

import { getDistance } from 'geolib'

interface GetGasStationsPerDistanceRequest {
  userLatitude: number
  userLongitude: number
}

interface GetGasStationsPerDistanceResponse {
  gasStations: any[]
}

export class GetGasStationsPerDistance {
  async execute({
    userLatitude,
    userLongitude
  }: GetGasStationsPerDistanceRequest): Promise<GetGasStationsPerDistanceResponse> {
    const gasStations = await prisma.gasStation.findMany({
      select: selectGasStation(true)
    })

    const userCoords = {
      latitude: userLatitude,
      longitude: userLongitude
    }

    gasStations.sort((a, b) => {
      const distanceA = getDistance(userCoords, {
        latitude: a.latitude,
        longitude: a.longitude
      })
      const distanceB = getDistance(userCoords, {
        latitude: b.latitude,
        longitude: b.longitude
      })
      return distanceA - distanceB
    })

    return { gasStations }
  }
}
