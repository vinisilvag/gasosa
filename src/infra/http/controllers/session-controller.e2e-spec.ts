import request from 'supertest'

import { app } from '@/app'

import { faker } from '@faker-js/faker'

describe('[e2e] Session Controller', () => {
  it('should be able to authenticate an existing user', async () => {
    const userData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }

    await request(app).post('/api/v1/users').send(userData)
    const response = await request(app)
      .post('/api/v1/sessions/users/authenticate')
      .send({
        email: userData.email,
        password: userData.password
      })

    expect(response.statusCode).toBe(200)
    expect(response.body.error).toBeFalsy()
    expect(response.body.user).toBeTruthy()
    expect(response.body.token).toBeTruthy()
  })

  it('should not be able to authenticate with invalid credentials', async () => {
    const userData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }

    await request(app).post('/api/v1/users').send(userData)
    const response = await request(app)
      .post('/api/v1/sessions/users/authenticate')
      .send({
        email: userData.email,
        password: 'wrong-password'
      })

    expect(response.statusCode).toBe(401)
    expect(response.body.status).toEqual('error')
    expect(response.body.message).toEqual('Invalid email/password combination.')
    expect(response.unauthorized).toBeTruthy()
  })
})
