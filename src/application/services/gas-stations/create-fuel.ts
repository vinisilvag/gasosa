import { inject as Inject, injectable as Injectable } from 'tsyringe'
import { type GasStationsRepository } from '@/application/repositories/gas-stations-repository'
import { type FuelsRepository } from '@/application/repositories/fuels-repository'

import { type Fuel } from '@prisma/client'

import { GasStationNotFound } from '@/application/errors/gas-stations/gas-station-not-found'

interface CreateFuelRequest {
  name: string
  price: number
  gasStationId: number
}

interface CreateFuelResponse {
  fuel: Omit<Fuel, 'gasStationId'>
}

@Injectable()
export class CreateFuel {
  constructor(
    @Inject('GasStationsRepository')
    private readonly gasStationsRepository: GasStationsRepository,
    @Inject('FuelsRepository')
    private readonly fuelsRepository: FuelsRepository
  ) {}

  async execute({
    name,
    price,
    gasStationId
  }: CreateFuelRequest): Promise<CreateFuelResponse> {
    const gasStation = await this.gasStationsRepository.findById(gasStationId)

    if (!gasStation) {
      throw new GasStationNotFound()
    }

    const fuel = await this.fuelsRepository.create({
      name,
      price,
      gasStationId
    })

    return { fuel }
  }
}
