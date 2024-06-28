import { ENV } from '@/config/env/app'

import { type GasStation, PrismaClient } from '@prisma/client'

export interface LikeWithGasStation {
  gasStation: Omit<GasStation, 'password'>
}

export const prisma = new PrismaClient({
  log: ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error']
})
