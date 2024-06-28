import { inject as Inject, injectable as Injectable } from 'tsyringe'
import { type GasStationsRepository } from '@/application/repositories/gas-stations-repository'

import { GasStationNotFound } from '@/application/errors/gas-stations/gas-station-not-found'

import { type GasStation } from '@prisma/client'

interface ShowGasStationRequest {
  gasStationId: string
}

interface ShowGasStationResponse {
  gasStation: GasStation
}

@Injectable()
export class ShowGasStation {
  constructor(
    @Inject('GasStationsRepository')
    private readonly gasStationsRepository: GasStationsRepository
  ) {}

  async execute({
    gasStationId
  }: ShowGasStationRequest): Promise<ShowGasStationResponse> {
    const gasStation = await this.gasStationsRepository.findById(gasStationId)

    if (!gasStation) {
      throw new GasStationNotFound()
    }

    return { gasStation }
  }
}
