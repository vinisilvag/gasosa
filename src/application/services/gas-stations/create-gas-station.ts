import { inject as Inject, injectable as Injectable } from 'tsyringe'
import { type GasStationsRepository } from '@/application/repositories/gas-stations-repository'

import { hash } from 'bcrypt'

import { GasStationAlreadyExists } from '@/application/errors/gas-stations/gas-station-already-exists'
import { type GasStation } from '@prisma/client'

interface CreateGasStationRequest {
  name: string
  email: string
  password: string
  latitude: number
  longitude: number
}

interface CreateGasStationResponse {
  gasStation: GasStation
}

@Injectable()
export class CreateGasStation {
  constructor(
    @Inject('GasStationsRepository')
    private readonly gasStationsRepository: GasStationsRepository
  ) {}

  async execute({
    name,
    email,
    password,
    latitude,
    longitude
  }: CreateGasStationRequest): Promise<CreateGasStationResponse> {
    const gasStationExists = await this.gasStationsRepository.findByEmail(email)

    if (gasStationExists) {
      throw new GasStationAlreadyExists()
    }

    const hashedPassword = await hash(password, 10)

    const gasStation = await this.gasStationsRepository.create({
      name,
      email,
      password: hashedPassword,
      latitude,
      longitude
    })

    return { gasStation }
  }
}
