import { CreateUser } from './create-user'
import { InMemoryUsersRepository } from '@/tests/repositories/in-memory-users-repository'

import { UserAlreadyExists } from '@/application/errors/users/user-already-exists'

import { faker } from '@faker-js/faker'

describe('Create User', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository
  let createUser: CreateUser

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createUser = new CreateUser(inMemoryUsersRepository)
  })

  it('should be able to create a user', async () => {
    const { user } = await createUser.execute({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    })

    expect(user).toBeTruthy()
    expect(inMemoryUsersRepository.users).toHaveLength(1)
    expect(inMemoryUsersRepository.users[0]).toEqual(user)
  })

  it('should not be able to create a user with an existing email', async () => {
    await createUser.execute({
      name: faker.person.fullName(),
      email: 'test@mail.com',
      password: faker.internet.password()
    })

    expect(async () => {
      await createUser.execute({
        name: faker.person.fullName(),
        email: 'test@mail.com',
        password: faker.internet.password()
      })
    }).rejects.toEqual(new UserAlreadyExists())
  })
})
