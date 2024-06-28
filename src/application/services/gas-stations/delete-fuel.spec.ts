import { describe, beforeEach, it, expect } from 'vitest'

import { DeleteFuel } from './delete-fuel'
import { InMemoryFuelsRepository } from '@/tests/repositories/in-memory-fuels-repository'

import { FuelNotFound } from '@/application/errors/gas-stations/fuel-not-found'
import { NotOwnerOfTheFuel } from '@/application/errors/gas-stations/not-owner-of-the-fuel'

import { faker } from '@faker-js/faker'

describe('Delete Fuel', () => {
  let inMemoryFuelsRepository: InMemoryFuelsRepository
  let deleteFuel: DeleteFuel

  beforeEach(() => {
    inMemoryFuelsRepository = new InMemoryFuelsRepository()
    deleteFuel = new DeleteFuel(inMemoryFuelsRepository)
  })

  it('should be able to delete a fuel', async () => {
    const fuel = await inMemoryFuelsRepository.create({
      gasStationId: crypto.randomUUID(),
      name: faker.lorem.word(),
      price: Number(faker.finance.amount())
    })

    expect(inMemoryFuelsRepository.fuels).toHaveLength(1)

    await deleteFuel.execute({
      fuelId: fuel.id,
      gasStationId: fuel.gasStationId
    })
    expect(inMemoryFuelsRepository.fuels).toHaveLength(0)
  })

  it('should not be able to delete a fuel that does not exists', async () => {
    expect(async () => {
      await deleteFuel.execute({
        fuelId: crypto.randomUUID(),
        gasStationId: crypto.randomUUID()
      })
    }).rejects.toEqual(new FuelNotFound())
  })

  it('should not be able to delete a fuel owned by other gas station', async () => {
    const fuel1 = await inMemoryFuelsRepository.create({
      gasStationId: crypto.randomUUID(),
      name: faker.lorem.word(),
      price: Number(faker.finance.amount())
    })

    const fuel2 = await inMemoryFuelsRepository.create({
      gasStationId: crypto.randomUUID(),
      name: faker.lorem.word(),
      price: Number(faker.finance.amount())
    })

    expect(async () => {
      await deleteFuel.execute({
        fuelId: fuel1.id,
        gasStationId: fuel2.gasStationId
      })
    }).rejects.toEqual(new NotOwnerOfTheFuel())
  })
})
