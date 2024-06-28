import {
  type DeleteLike,
  type CreateLike,
  type LikesRepository
} from '@/application/repositories/likes-repository'

import { prisma } from '@/infra/database/prisma/client'

export class PrismaLikesRepository implements LikesRepository {
  async findManyByUserId(userId: string) {
    const likes = await prisma.like.findMany({
      where: { userId },
      select: { gasStation: true }
    })
    return likes
  }

  async findUniqueByUserAndGasStationId(userId: string, gasStationId: string) {
    const like = await prisma.like.findUnique({
      where: { userId_gasStationId: { userId, gasStationId } }
    })
    return like
  }

  async create(data: CreateLike) {
    const { userId, gasStationId } = data
    await prisma.like.create({ data: { userId, gasStationId } })
  }

  async delete(data: DeleteLike) {
    const { userId, gasStationId } = data
    await prisma.like.delete({
      where: { userId_gasStationId: { userId, gasStationId } }
    })
  }
}
