import { type GasStation } from '@prisma/client'

interface HTTPGasStation {
  id: number
  name: string
  email: string
  latitude: number
  longitude: number
  gasPrice: number
}

export class GasStationViewModel {
  static toHTTP(gasStation: GasStation): HTTPGasStation {
    return {
      id: gasStation.id,
      name: gasStation.name,
      email: gasStation.email,
      latitude: gasStation.latitude,
      longitude: gasStation.longitude,
      gasPrice: gasStation.gasPrice
    }
  }
}
