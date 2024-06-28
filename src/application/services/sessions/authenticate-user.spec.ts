import { describe, beforeEach, it, expect } from 'vitest'

import { CreateUser } from '../users/create-user'
import { AuthenticateUser } from './authenticate-user'
import { InMemoryUsersRepository } from '@/tests/repositories/in-memory-users-repository'

import { UserNotFound } from '@/application/errors/users/user-not-found'
import { InvalidCredentials } from '@/application/errors/sessions/invalid-credentials'

import { faker } from '@faker-js/faker'

describe('Authenticate User', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository
  let authenticateUser: AuthenticateUser

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    authenticateUser = new AuthenticateUser(inMemoryUsersRepository)
  })

  it('should be able to authenticate an existing user', async () => {
    const createUser = new CreateUser(inMemoryUsersRepository)

    await createUser.execute({
      name: faker.person.fullName(),
      email: 'test@mail.com',
      password: '123456'
    })

    const { token, user } = await authenticateUser.execute({
      email: 'test@mail.com',
      password: '123456'
    })

    expect(token).toBeTruthy()
    expect(user).toBeTruthy()
  })

  it('should not be able to authenticate an user that does not exist', async () => {
    expect(async () => {
      await authenticateUser.execute({
        email: 'test@mail.com',
        password: faker.internet.password()
      })
    }).rejects.toEqual(new UserNotFound())
  })

  it('should not be able to authenticate with invalid credentials', async () => {
    const createUser = new CreateUser(inMemoryUsersRepository)

    await createUser.execute({
      name: faker.person.fullName(),
      email: 'test@mail.com',
      password: '123456'
    })

    expect(async () => {
      await authenticateUser.execute({
        email: 'test@mail.com',
        password: '1234567'
      })
    }).rejects.toEqual(new InvalidCredentials())
  })
})
