interface PrismaLike {
  gasStation: {
    id: string
    name: string
    email: string
    latitude: number
    longitude: number
    createdAt: Date
    updatedAt: Date
  }
}

interface HTTPLike {
  id: string
  name: string
  email: string
  latitude: number
  longitude: number
  createdAt: Date
  updatedAt: Date
}

export class LikeViewModel {
  static toHTTP(like: PrismaLike): HTTPLike {
    return {
      id: like.gasStation.id,
      name: like.gasStation.name,
      email: like.gasStation.email,
      latitude: like.gasStation.latitude,
      longitude: like.gasStation.longitude,
      createdAt: like.gasStation.createdAt,
      updatedAt: like.gasStation.updatedAt
    }
  }
}
