import { inject as Inject, injectable as Injectable } from 'tsyringe'
import { type UsersRepository } from '@/application/repositories/users-repository'

import { type User } from '@prisma/client'

import { SECRET } from '@/config/env/auth'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { UserNotFound } from '@/application/errors/users/user-not-found'
import { InvalidCredentials } from '@/application/errors/sessions/invalid-credentials'

interface AuthenticateUserRequest {
  email: string
  password: string
}

interface AuthenticateUserResponse {
  user: Omit<User, 'password'>
  token: string
}

@Injectable()
export class AuthenticateUser {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository
  ) {}

  async execute({
    email,
    password
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new UserNotFound()
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new InvalidCredentials()
    }

    const token = sign({ id: user.id }, SECRET, {
      expiresIn: '7d'
    })

    const { password: removed, ...userWithoutPassword } = user

    return { token, user: userWithoutPassword }
  }
}
