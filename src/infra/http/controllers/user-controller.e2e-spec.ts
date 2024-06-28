import request from 'supertest'

import { app } from '@/app'

import { faker } from '@faker-js/faker'

describe('[e2e] User Controller', () => {
  it('should be able to create a new user', async () => {
    const userData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }

    const response = await request(app).post('/api/v1/users').send(userData)

    expect(response.statusCode).toBe(201)
    expect(response.body.user).toBeTruthy()
    expect(response.body.user.name).toEqual(userData.name)
    expect(response.body.user.email).toEqual(userData.email)
  })

  it('should not be able to create an user with an invalid email', async () => {
    const response = await request(app).post('/api/v1/users').send({
      name: faker.person.fullName(),
      email: 'invalid@email.',
      password: faker.internet.password()
    })

    expect(response.statusCode).toBe(400)
    expect(response.body.errors).toBeTruthy()
    expect(response.badRequest).toBeTruthy()
  })

  it('should be able to like an existing gas station', async () => {
    const userData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }

    const gasStationData = {
      name: faker.company.name(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude()
    }

    await request(app).post('/api/v1/users').send(userData)
    const gasStationResponse = await request(app)
      .post('/api/v1/gas-stations')
      .send(gasStationData)

    const gasStationId = gasStationResponse.body.gasStation.id

    const authResponse = await request(app)
      .post('/api/v1/sessions/users/authenticate')
      .send({ email: userData.email, password: userData.password })

    const authToken = authResponse.body.token

    const response = await request(app)
      .post(`/api/v1/users/like/${gasStationId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(gasStationData)

    expect(response.statusCode).toBe(204)
    expect(response.noContent).toBe(true)
  })
})
