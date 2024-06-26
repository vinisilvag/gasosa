import { inject as Inject, injectable as Injectable } from 'tsyringe'
import { type FuelsRepository } from '@/application/repositories/fuels-repository'

import { type Fuel } from '@prisma/client'

import { FuelNotFound } from '@/application/errors/gas-stations/fuel-not-found'
import { NotOwnerOfTheFuel } from '@/application/errors/gas-stations/not-owner-of-the-fuel'

interface UpdateFuelRequest {
  newName: string
  newPrice: number
  gasStationId: number
  fuelId: number
}

interface UpdateFuelResponse {
  fuel: Omit<Fuel, 'gasStationId'>
}

@Injectable()
export class UpdateFuel {
  constructor(
    @Inject('FuelsRepository')
    private readonly fuelsRepository: FuelsRepository
  ) {}

  async execute({
    newName,
    newPrice,
    gasStationId,
    fuelId
  }: UpdateFuelRequest): Promise<UpdateFuelResponse> {
    const fuel = await this.fuelsRepository.findById(fuelId)

    if (!fuel) throw new FuelNotFound()

    if (fuel.gasStationId !== gasStationId) {
      throw new NotOwnerOfTheFuel()
    }

    const updatedFuel = await this.fuelsRepository.update({
      name: newName,
      price: newPrice,
      fuelId
    })

    return { fuel: updatedFuel }
  }
}
