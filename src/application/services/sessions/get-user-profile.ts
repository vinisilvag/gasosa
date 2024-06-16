import { prisma } from '@/infra/database/prisma/client'
import { type User } from '@prisma/client'

import { selectUser } from '@/utils/select-user'

import { UserNotFound } from '@/application/errors/users/user-not-found'

interface GetUserProfileRequest {
  userId: number
}

interface GetUserProfileResponse {
  user: Omit<User, 'password'>
}

export class GetUserProfile {
  async execute({
    userId
  }: GetUserProfileRequest): Promise<GetUserProfileResponse> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: selectUser()
    })

    if (!user) {
      throw new UserNotFound()
    }

    return { user }
  }
}
