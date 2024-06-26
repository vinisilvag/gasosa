import { inject as Inject, injectable as Injectable } from 'tsyringe'
import { type FuelsRepository } from '@/application/repositories/fuels-repository'

import { FuelNotFound } from '@/application/errors/gas-stations/fuel-not-found'
import { NotOwnerOfTheFuel } from '@/application/errors/gas-stations/not-owner-of-the-fuel'

interface DeleteFuelRequest {
  fuelId: number
  gasStationId: number
}

@Injectable()
export class DeleteFuel {
  constructor(
    @Inject('FuelsRepository')
    private readonly fuelsRepository: FuelsRepository
  ) {}

  async execute({ fuelId, gasStationId }: DeleteFuelRequest): Promise<void> {
    const fuel = await this.fuelsRepository.findById(fuelId)

    if (!fuel) throw new FuelNotFound()

    if (fuel.gasStationId !== gasStationId) {
      throw new NotOwnerOfTheFuel()
    }

    await this.fuelsRepository.delete(fuelId)
  }
}
