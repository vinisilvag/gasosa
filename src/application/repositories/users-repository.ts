import { type User } from '@prisma/client'

export interface CreateUser {
  name: string
  email: string
  password: string
}

export interface UsersRepository {
  findById: (id: string) => Promise<User | null>
  findByEmail: (email: string) => Promise<User | null>
  create: (data: CreateUser) => Promise<User>
  delete: (id: string) => Promise<void>
}
