import { type Fuel, type GasStation } from '@prisma/client'
import { FuelViewModel, type HTTPFuel } from './fuel-view-model'

interface GasStationWithFuels extends GasStation {
  fuels?: Fuel[]
}

interface HTTPGasStation {
  id: string
  name: string
  email: string
  latitude: number
  longitude: number
  createdAt: Date
  updatedAt: Date
  fuels?: HTTPFuel[]
}

export class GasStationViewModel {
  static toHTTP(gasStation: GasStationWithFuels): HTTPGasStation {
    return {
      id: gasStation.id,
      name: gasStation.name,
      email: gasStation.email,
      latitude: gasStation.latitude,
      longitude: gasStation.longitude,
      createdAt: gasStation.createdAt,
      updatedAt: gasStation.updatedAt,
      fuels: gasStation.fuels
        ? gasStation.fuels.map(fuel => FuelViewModel.toHTTP(fuel))
        : undefined
    }
  }
}
