import { type User } from '@prisma/client'

interface HTTPUser {
  id: number
  name: string
  email: string
  type: string
  latitude?: number | null
  longitude?: number | null
  gasPrice?: number | null
}

export class UserViewModel {
  static toHTTP(user: User): HTTPUser {
    if (user.type === 'user') {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type
      }
    } else {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        latitude: user.latitude,
        longitude: user.longitude,
        gasPrice: user.gasPrice
      }
    }
  }
}
