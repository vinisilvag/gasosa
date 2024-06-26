import { type GasStation } from '@prisma/client'

export interface CreateGasStation {
  name: string
  email: string
  password: string
  latitude: number
  longitude: number
}

export interface GasStationsRepository {
  findMany: () => Promise<GasStation[]>
  findManyPerName: (
    gasStationName: string,
    fuelName: string
  ) => Promise<GasStation[]>
  findById: (id: number) => Promise<GasStation | null>
  findByEmail: (email: string) => Promise<GasStation | null>
  create: (data: CreateGasStation) => Promise<GasStation>
  delete: (id: number) => Promise<void>
}
