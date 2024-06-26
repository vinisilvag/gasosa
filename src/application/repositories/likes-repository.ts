import { type Like } from '@prisma/client'

export interface CreateLike {
  userId: number
  gasStationId: number
}

export interface DeleteLike {
  userId: number
  gasStationId: number
}

export interface LikesRepository {
  findManyByUserId: (userId: number) => Promise<Like[]>
  findUniqueByUserAndGasStationId: (
    userId: number,
    gasStationId: number
  ) => Promise<Like | null>
  create: (data: CreateLike) => Promise<void>
  delete: (data: DeleteLike) => Promise<void>
}
