import {
  type CreateFuel,
  type UpdateFuel,
  type FuelsRepository
} from '@/application/repositories/fuels-repository'

import { type Fuel } from '@prisma/client'

export class InMemoryFuelsRepository implements FuelsRepository {
  public fuels: Fuel[] = []

  async findById(id: string) {
    const fuel = this.fuels.find(fuel => fuel.id === id)
    if (!fuel) return null
    return fuel
  }

  async create(data: CreateFuel) {
    const createdFuel = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    this.fuels.push(createdFuel)
    return createdFuel
  }

  async update(data: UpdateFuel) {
    const index = this.fuels.findIndex(fuel => fuel.id === data.fuelId)
    if (index >= 0) {
      this.fuels[index].name = data.name
      this.fuels[index].price = data.price
    }
  }

  async delete(id: string) {
    const fuelsLeft = this.fuels.filter(fuel => fuel.id !== id)
    this.fuels = fuelsLeft
  }
}
