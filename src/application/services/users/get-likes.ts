import { inject as Inject, injectable as Injectable } from 'tsyringe'
import { type UsersRepository } from '@/application/repositories/users-repository'
import { type LikesRepository } from '@/application/repositories/likes-repository'

import { UserNotFound } from '@/application/errors/users/user-not-found'

import { type GasStation } from '@prisma/client'

interface GetLikesRequest {
  userId: string
}

interface GetLikesResponse {
  likes: Array<{ gasStation: Omit<GasStation, 'password'> }>
}

@Injectable()
export class GetLikes {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
    @Inject('LikesRepository')
    private readonly likesRepository: LikesRepository
  ) {}

  async execute({ userId }: GetLikesRequest): Promise<GetLikesResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotFound()
    }

    const likes = await this.likesRepository.findManyByUserId(userId)

    return { likes }
  }
}
