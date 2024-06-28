import {
  type CreateLike,
  type DeleteLike,
  type LikesRepository
} from '@/application/repositories/likes-repository'

import { type Like } from '@prisma/client'

export class InMemoryLikesRepository implements LikesRepository {
  public likes: Like[] = []

  // to be implemented in the future
  async findManyByUserId(userId: string) {
    return []
  }

  async findUniqueByUserAndGasStationId(userId: string, gasStationId: string) {
    const like = this.likes.find(
      like => like.userId === userId && like.gasStationId === gasStationId
    )
    if (!like) return null
    return like
  }

  async create(data: CreateLike) {
    this.likes.push({
      ...data
    })
  }

  async delete(data: DeleteLike) {
    const likesLeft = this.likes.filter(
      like =>
        like.userId !== data.userId && like.gasStationId !== data.gasStationId
    )
    this.likes = likesLeft
  }
}
