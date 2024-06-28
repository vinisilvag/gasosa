import { type GasStation, PrismaClient } from '@prisma/client'

export interface LikeWithGasStation {
  gasStation: Omit<GasStation, 'password'>
}

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
})
