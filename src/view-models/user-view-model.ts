import { type User } from '@prisma/client'

interface HTTPUser {
  id: number
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export class UserViewModel {
  static toHTTP(user: User): HTTPUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  }
}
