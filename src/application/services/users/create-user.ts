import { prisma } from '@/infra/database/prisma/client'
import { type User } from '@prisma/client'

import { hash } from 'bcrypt'

import { selectUser } from '@/utils/select-user'

import { UserAlreadyExists } from '@/application/errors/users/user-already-exists'

interface CreateUserRequest {
  name: string
  email: string
  password: string
}

interface CreateUserResponse {
  user: Omit<User, 'password'>
}

export class CreateUser {
  async execute({
    name,
    email,
    password
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const userExists = await prisma.user.findUnique({
      where: { email }
    })

    if (userExists) {
      throw new UserAlreadyExists()
    }

    const hashedPassword = await hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      },
      select: selectUser()
    })

    return { user }
  }
}
