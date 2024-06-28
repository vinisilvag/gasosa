import { inject as Inject, injectable as Injectable } from 'tsyringe'
import { type UsersRepository } from '@/application/repositories/users-repository'

import { type User } from '@prisma/client'

import { UserNotFound } from '@/application/errors/users/user-not-found'

interface GetUserProfileRequest {
  userId: string
}

interface GetUserProfileResponse {
  user: User
}

@Injectable()
export class GetUserProfile {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository
  ) {}

  async execute({
    userId
  }: GetUserProfileRequest): Promise<GetUserProfileResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotFound()
    }

    return { user }
  }
}
