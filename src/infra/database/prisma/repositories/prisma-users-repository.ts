import {
  type CreateUser,
  type UsersRepository
} from '@/application/repositories/users-repository'

import { prisma } from '@/infra/database/prisma/client'

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    return await prisma.user.findUnique({ where: { id } })
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } })
  }

  async create(data: CreateUser) {
    const { name, email, password } = data

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    })

    return user
  }

  async delete(id: string) {
    await prisma.user.delete({
      where: {
        id
      }
    })
  }
}
