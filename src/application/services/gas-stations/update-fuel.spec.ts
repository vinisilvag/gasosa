import { describe, beforeEach, it, expect } from 'vitest'

import { UpdateFuel } from './update-fuel'
import { InMemoryFuelsRepository } from '@/tests/repositories/in-memory-fuels-repository'

import { FuelNotFound } from '@/application/errors/gas-stations/fuel-not-found'
import { NotOwnerOfTheFuel } from '@/application/errors/gas-stations/not-owner-of-the-fuel'

import { faker } from '@faker-js/faker'

describe('Update Fuel', () => {
  let inMemoryFuelsRepository: InMemoryFuelsRepository
  let updateFuel: UpdateFuel

  beforeEach(() => {
    inMemoryFuelsRepository = new InMemoryFuelsRepository()
    updateFuel = new UpdateFuel(inMemoryFuelsRepository)
  })

  it('should be able to update a fuel', async () => {})

  it('should not be able to update a fuel that does not exists', async () => {})

  it('should not be able to update a fuel owned by other gas station', async () => {})
})
