import { inject as Inject, injectable as Injectable } from 'tsyringe'
import { type GasStationsRepository } from '@/application/repositories/gas-stations-repository'

import { GasStationNotFound } from '@/application/errors/gas-stations/gas-station-not-found'

interface DeleteGasStationRequest {
  gasStationId: number
}

@Injectable()
export class DeleteGasStation {
  constructor(
    @Inject('GasStationsRepository')
    private readonly gasStationsRepository: GasStationsRepository
  ) {}

  async execute({ gasStationId }: DeleteGasStationRequest): Promise<void> {
    const gasStation = await this.gasStationsRepository.findById(gasStationId)

    if (!gasStation) {
      throw new GasStationNotFound()
    }

    await this.gasStationsRepository.delete(gasStationId)
  }
}
