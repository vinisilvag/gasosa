import {
  type CreateUser,
  type UsersRepository
} from '@/application/repositories/users-repository'

import { type User } from '@prisma/client'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async findById(id: string) {
    const user = this.users.find(user => user.id === id)
    if (!user) return null
    return user
  }

  async findByEmail(email: string) {
    const user = this.users.find(user => user.email === email)
    if (!user) return null
    return user
  }

  async create(data: CreateUser) {
    const createdUser = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    this.users.push(createdUser)
    return createdUser
  }

  async delete(id: string) {
    const usersLeft = this.users.filter(user => user.id !== id)
    this.users = usersLeft
  }
}
