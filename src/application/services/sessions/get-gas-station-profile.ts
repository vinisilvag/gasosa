import { inject as Inject, injectable as Injectable } from 'tsyringe'
import { type GasStationsRepository } from '@/application/repositories/gas-stations-repository'

import { type GasStation } from '@prisma/client'

import { GasStationNotFound } from '@/application/errors/gas-stations/gas-station-not-found'

interface GetGasStationProfileRequest {
  gasStationId: number
}

interface GetGasStationProfileResponse {
  gasStation: Omit<GasStation, 'password'>
}

@Injectable()
export class GetGasStationProfile {
  constructor(
    @Inject('GasStationsRepository')
    private readonly gasStationsRepository: GasStationsRepository
  ) {}

  async execute({
    gasStationId
  }: GetGasStationProfileRequest): Promise<GetGasStationProfileResponse> {
    const gasStation = await this.gasStationsRepository.findById(gasStationId)

    if (!gasStation) {
      throw new GasStationNotFound()
    }

    const { password: removed, ...gasStationWithoutPassword } = gasStation

    return { gasStation: gasStationWithoutPassword }
  }
}
