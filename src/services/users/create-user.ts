import { prisma } from '@database/prisma'
import { AppError } from '@helpers/app-error'
import { type User } from '@prisma/client'
import { selectUser } from '@utils/select-user'
import { hash } from 'bcrypt'

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

    if (!userExists) {
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
    } else {
      throw new AppError(409, 'Email already registered.')
    }
  }
}
