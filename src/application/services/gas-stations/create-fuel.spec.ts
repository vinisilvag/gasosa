import { describe, beforeEach, it, expect } from 'vitest'

import { CreateFuel } from './create-fuel'
import { InMemoryFuelsRepository } from '@/tests/repositories/in-memory-fuels-repository'
import { InMemoryGasStationsRepository } from '@/tests/repositories/in-memory-gas-stations-repository'

import { faker } from '@faker-js/faker'

import { GasStationNotFound } from '@/application/errors/gas-stations/gas-station-not-found'

describe('Create Fuel', () => {
  let inMemoryFuelsRepository: InMemoryFuelsRepository
  let inMemoryGasStationsRepository: InMemoryGasStationsRepository
  let createFuel: CreateFuel

  beforeEach(() => {
    inMemoryFuelsRepository = new InMemoryFuelsRepository()
    inMemoryGasStationsRepository = new InMemoryGasStationsRepository()
    createFuel = new CreateFuel(
      inMemoryGasStationsRepository,
      inMemoryFuelsRepository
    )
  })

  it('should be able to create a fuel', async () => {
    const gasStation = await inMemoryGasStationsRepository.create({
      name: faker.company.name(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude()
    })

    const { fuel } = await createFuel.execute({
      gasStationId: gasStation.id,
      name: faker.lorem.word(),
      price: Number(faker.finance.amount())
    })

    expect(fuel).toBeTruthy()
    expect(inMemoryFuelsRepository.fuels).toHaveLength(1)
    expect(inMemoryFuelsRepository.fuels[0]).toEqual(fuel)
  })

  it('should not be able to create a fuel for a non existing gas station', async () => {
    expect(async () => {
      await createFuel.execute({
        gasStationId: crypto.randomUUID(),
        name: faker.lorem.word(),
        price: Number(faker.finance.amount())
      })
    }).rejects.toEqual(new GasStationNotFound())
  })
})
