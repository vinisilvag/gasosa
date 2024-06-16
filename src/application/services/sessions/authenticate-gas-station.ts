import { prisma } from '@/infra/database/prisma/client'
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
  gasStation: Omit<GasStation, 'password'>
  token: string
}

export class AuthenticateGasStation {
  async execute({
    email,
    password
  }: AuthenticateGasStationRequest): Promise<AuthenticateGasStationResponse> {
    const gasStation = await prisma.gasStation.findUnique({ where: { email } })

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

    const { password: removed, ...gasStationWithoutPassword } = gasStation

    return { token, gasStation: gasStationWithoutPassword }
  }
}
