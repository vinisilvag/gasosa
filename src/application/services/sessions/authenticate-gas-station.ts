import { inject as Inject, injectable as Injectable } from 'tsyringe'
import { type GasStationsRepository } from '@/application/repositories/gas-stations-repository'

import { type GasStation } from '@prisma/client'

import { SECRET } from '@/config/env/auth'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { InvalidCredentials } from '@/application/errors/sessions/invalid-credentials'
import { GasStationNotFound } from '@/application/errors/gas-stations/gas-station-not-found'

interface AuthenticateGasStationRequest {
  email: string
  password: string
}

interface AuthenticateGasStationResponse {
  gasStation: GasStation
  token: string
}

@Injectable()
export class AuthenticateGasStation {
  constructor(
    @Inject('GasStationsRepository')
    private readonly gasStationsRepository: GasStationsRepository
  ) {}

  async execute({
    email,
    password
  }: AuthenticateGasStationRequest): Promise<AuthenticateGasStationResponse> {
    const gasStation = await this.gasStationsRepository.findByEmail(email)

    if (!gasStation) {
      throw new GasStationNotFound()
    }

    const passwordMatch = await compare(password, gasStation.password)

    if (!passwordMatch) {
      throw new InvalidCredentials()
    }

    const token = sign({ id: gasStation.id }, SECRET, {
      expiresIn: '7d'
    })

    return { token, gasStation }
  }
}
