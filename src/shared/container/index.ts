import { container } from 'tsyringe'

// repositories
import { type UsersRepository } from '@/application/repositories/users-repository'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'

import { type GasStationsRepository } from '@/application/repositories/gas-stations-repository'
import { PrismaGasStationsRepository } from '@/infra/database/prisma/repositories/prisma-gas-stations-repository'

import { type LikesRepository } from '@/application/repositories/likes-repository'
import { PrismaLikesRepository } from '@/infra/database/prisma/repositories/prisma-likes-repository'

import { type FuelsRepository } from '@/application/repositories/fuels-repository'
import { PrismaFuelsRepository } from '@/infra/database/prisma/repositories/prisma-fuels-repository'

// repositories
container.registerSingleton<UsersRepository>(
  'UsersRepository',
  PrismaUsersRepository
)

container.registerSingleton<GasStationsRepository>(
  'GasStationsRepository',
  PrismaGasStationsRepository
)

container.registerSingleton<LikesRepository>(
  'LikesRepository',
  PrismaLikesRepository
)

container.registerSingleton<FuelsRepository>(
  'FuelsRepository',
  PrismaFuelsRepository
)
