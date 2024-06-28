import {
  type CreateGasStation,
  type GasStationsRepository
} from '@/application/repositories/gas-stations-repository'

import { type GasStation } from '@prisma/client'

export class InMemoryGasStationsRepository implements GasStationsRepository {
  public gasStations: GasStation[] = []

  async findMany() {
    return this.gasStations
  }

  // fix for fuelName
  async findManyPerName(gasStationName: string, fuelName: string) {
    return this.gasStations.filter(gasStation => {
      if (gasStation.name.includes(gasStationName)) return true
      return false
    })
  }

  async findById(id: string) {
    const gasStation = this.gasStations.find(gasStation => gasStation.id === id)
    if (!gasStation) return null
    return gasStation
  }

  async findByEmail(email: string) {
    const gasStation = this.gasStations.find(
      gasStation => gasStation.email === email
    )
    if (!gasStation) return null
    return gasStation
  }

  async create(data: CreateGasStation) {
    const createdGasStation = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    this.gasStations.push(createdGasStation)
    return createdGasStation
  }

  async delete(id: string) {
    const gasStationsLeft = this.gasStations.filter(
      gasStation => gasStation.id !== id
    )
    this.gasStations = gasStationsLeft
  }
}
