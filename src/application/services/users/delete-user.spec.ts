import { DeleteUser } from './delete-user'

import { InMemoryUsersRepository } from '@/tests/repositories/in-memory-users-repository'

import { UserNotFound } from '@/application/errors/users/user-not-found'

import { faker } from '@faker-js/faker'

describe('Delete User', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository
  let deleteUser: DeleteUser

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    deleteUser = new DeleteUser(inMemoryUsersRepository)
  })

  it('should be able to delete a user', async () => {
    const user = await inMemoryUsersRepository.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    })

    expect(inMemoryUsersRepository.users).toHaveLength(1)

    await deleteUser.execute({ userId: user.id })
    expect(inMemoryUsersRepository.users).toHaveLength(0)
  })

  it('should not be able to delete a user that does not exist', async () => {
    expect(async () => {
      await deleteUser.execute({ userId: crypto.randomUUID() })
    }).rejects.toEqual(new UserNotFound())
  })
})
