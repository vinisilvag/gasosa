import { type Like } from '@prisma/client'
import { type LikeWithGasStation } from '@/infra/database/prisma/client'

export interface CreateLike {
  userId: string
  gasStationId: string
}

export interface DeleteLike {
  userId: string
  gasStationId: string
}

export interface LikesRepository {
  findManyByUserId: (userId: string) => Promise<LikeWithGasStation[]>
  findUniqueByUserAndGasStationId: (
    userId: string,
    gasStationId: string
  ) => Promise<Like | null>
  create: (data: CreateLike) => Promise<void>
  delete: (data: DeleteLike) => Promise<void>
}
