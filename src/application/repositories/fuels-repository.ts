import { type Fuel } from '@prisma/client'

export interface CreateFuel {
  name: string
  price: number
  gasStationId: number
}

export interface UpdateFuel {
  name: string
  price: number
  fuelId: number
}

export interface FuelsRepository {
  findById: (id: number) => Promise<Fuel | null>
  create: (data: CreateFuel) => Promise<Fuel>
  update: (data: UpdateFuel) => Promise<Fuel>
  delete: (id: number) => Promise<void>
}
