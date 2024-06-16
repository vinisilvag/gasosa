import { prisma } from '@/infra/database/prisma/client'

import { hash } from 'bcrypt'

import { selectGasStation } from '@/utils/select-gas-station'

import { GasStationAlreadyExists } from '@/application/errors/gas-stations/gas-station-already-exists'

interface CreateGasStationRequest {
  name: string
  email: string
  password: string
  latitude: number
  longitude: number
}

interface CreateGasStationResponse {
  gasStation: any
}

export class CreateGasStation {
  async execute({
    name,
    email,
    password,
    latitude,
    longitude
  }: CreateGasStationRequest): Promise<CreateGasStationResponse> {
    const gasStationExists = await prisma.gasStation.findUnique({
      where: { email }
    })

    if (gasStationExists) {
      throw new GasStationAlreadyExists()
    }

    const hashedPassword = await hash(password, 10)

    const gasStation = await prisma.gasStation.create({
      data: {
        name,
        email,
        password: hashedPassword,
        latitude,
        longitude
      },
      select: selectGasStation(false)
    })

    return { gasStation }
  }
}
