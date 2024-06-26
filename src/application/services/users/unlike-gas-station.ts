import { inject as Inject, injectable as Injectable } from 'tsyringe'
import { type UsersRepository } from '@/application/repositories/users-repository'
import { type GasStationsRepository } from '@/application/repositories/gas-stations-repository'
import { type LikesRepository } from '@/application/repositories/likes-repository'

import { UserNotFound } from '@/application/errors/users/user-not-found'
import { GasStationNotFound } from '@/application/errors/gas-stations/gas-station-not-found'
import { GasStationNotLikedYet } from '@/application/errors/users/gas-station-not-liked-yet'

interface UnlikeGasStationRequest {
  userId: number
  gasStationId: number
}

@Injectable()
export class UnlikeGasStation {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
    @Inject('GasStationsRepository')
    private readonly gasStationsRepository: GasStationsRepository,
    @Inject('LikesRepository')
    private readonly likesRepository: LikesRepository
  ) {}

  async execute({
    gasStationId,
    userId
  }: UnlikeGasStationRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId)
    const gasStation = await this.gasStationsRepository.findById(gasStationId)

    if (!user) {
      throw new UserNotFound()
    }

    if (!gasStation) {
      throw new GasStationNotFound()
    }

    const like = await this.likesRepository.findUniqueByUserAndGasStationId(
      userId,
      gasStationId
    )

    if (!like) {
      throw new GasStationNotLikedYet()
    }

    await this.likesRepository.delete({ userId, gasStationId })
  }
}
