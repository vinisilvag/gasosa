import { prisma } from '@/infra/database/prisma/client'

import { selectGasStation } from '@/utils/select-gas-station'

import { UserNotFound } from '@/application/errors/users/user-not-found'

interface GetLikesRequest {
  userId: number
}

interface GetLikesResponse {
  likes: any
}

export class GetLikes {
  async execute({ userId }: GetLikesRequest): Promise<GetLikesResponse> {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      throw new UserNotFound()
    }

    const likes = await prisma.like.findMany({
      where: { userId },
      select: {
        gasStation: {
          select: selectGasStation(false)
        }
      }
    })

    const filteredLikes = likes.map(like => {
      return {
        ...like.gasStation
      }
    })

    return { likes: filteredLikes }
  }
}
