import { inject as Inject, injectable as Injectable } from 'tsyringe'
import { type GasStationsRepository } from '@/application/repositories/gas-stations-repository'

import { getDistance } from 'geolib'

interface GetGasStationsPerDistanceRequest {
  userLatitude: number
  userLongitude: number
}

interface GetGasStationsPerDistanceResponse {
  gasStations: any[]
}

@Injectable()
export class GetGasStationsPerDistance {
  constructor(
    @Inject('GasStationsRepository')
    private readonly gasStationsRepository: GasStationsRepository
  ) {}

  async execute({
    userLatitude,
    userLongitude
  }: GetGasStationsPerDistanceRequest): Promise<GetGasStationsPerDistanceResponse> {
    const gasStations = await this.gasStationsRepository.findMany()

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
