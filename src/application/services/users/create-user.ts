import { inject as Inject, injectable as Injectable } from 'tsyringe'
import { type UsersRepository } from '@/application/repositories/users-repository'

import { type User } from '@prisma/client'

import { hash } from 'bcrypt'

import { UserAlreadyExists } from '@/application/errors/users/user-already-exists'

interface CreateUserRequest {
  name: string
  email: string
  password: string
}

interface CreateUserResponse {
  user: Omit<User, 'password'>
}

@Injectable()
export class CreateUser {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository
  ) {}

  async execute({
    name,
    email,
    password
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new UserAlreadyExists()
    }

    const hashedPassword = await hash(password, 10)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    })

    const { password: removed, ...userWithoutPassword } = user

    return { user: userWithoutPassword }
  }
}
