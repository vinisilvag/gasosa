import { type Fuel } from '@prisma/client'

export interface CreateFuel {
  name: string
  price: number
  gasStationId: string
}

export interface UpdateFuel {
  name: string
  price: number
  fuelId: string
}

export interface FuelsRepository {
  findById: (id: string) => Promise<Fuel | null>
  create: (data: CreateFuel) => Promise<Fuel>
  update: (data: UpdateFuel) => Promise<void>
  delete: (id: string) => Promise<void>
}
