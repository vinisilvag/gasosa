import request from 'supertest'

import { app } from '@/app'

import { faker } from '@faker-js/faker'

describe('[e2e] User Controller', () => {
  it('should be able to create a new user', async () => {
    // const response = await request(app).post('/api/v1/users').send({
    //   name: faker.person.fullName(),
    //   email: faker.internet.email(),
    //   password: faker.internet.password()
    // })
    // console.log(response)
  })
  it('should not be able to create an user with an invalid email', () => {})
  it('should be able to delete an existing user', () => {})
  it('should be able to like a gas station', () => {})
  it('should be able to unlike a gas station', () => {})
})
