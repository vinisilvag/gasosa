import {
  type DeleteLike,
  type CreateLike,
  type LikesRepository
} from '@/application/repositories/likes-repository'

import { prisma } from '@/infra/database/prisma/client'

export class PrismaLikesRepository implements LikesRepository {
  async findManyByUserId(userId: number) {
    const likes = await prisma.like.findMany({
      where: { userId }
    })

    return likes
  }

  async findUniqueByUserAndGasStationId(userId: number, gasStationId: number) {
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
