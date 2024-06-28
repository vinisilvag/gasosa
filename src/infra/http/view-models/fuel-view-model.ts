import { type Fuel } from '@prisma/client'

export interface HTTPFuel {
  id: string
  name: string
  price: number
  createdAt: Date
  updatedAt: Date
}

export class FuelViewModel {
  static toHTTP(fuel: Fuel): HTTPFuel {
    return {
      id: fuel.id,
      name: fuel.name,
      price: fuel.price,
      createdAt: fuel.createdAt,
      updatedAt: fuel.updatedAt
    }
  }
}
