import { inject as Inject, injectable as Injectable } from 'tsyringe'
import { type GasStationsRepository } from '@/application/repositories/gas-stations-repository'

interface GetGasStationsPerNameRequest {
  gasStationName: string
  fuelName: string
}

interface GetGasStationsPerNameResponse {
  gasStations: any[]
}

@Injectable()
export class GetGasStationsPerName {
  constructor(
    @Inject('GasStationsRepository')
    private readonly gasStationsRepository: GasStationsRepository
  ) {}

  async execute({
    gasStationName,
    fuelName
  }: GetGasStationsPerNameRequest): Promise<GetGasStationsPerNameResponse> {
    const gasStations = await this.gasStationsRepository.findManyPerName(
      gasStationName,
      fuelName
    )

    return { gasStations }
  }
}
