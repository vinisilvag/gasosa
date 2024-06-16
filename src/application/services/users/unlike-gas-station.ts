import { prisma } from '@/infra/database/prisma/client'

import { UserNotFound } from '@/application/errors/users/user-not-found'
import { GasStationNotFound } from '@/application/errors/gas-stations/gas-station-not-found'
import { GasStationNotLikedYet } from '@/application/errors/users/gas-station-not-liked-yet'

interface UnlikeGasStationRequest {
  userId: number
  gasStationId: number
}

export class UnlikeGasStation {
  async execute({
    gasStationId,
    userId
  }: UnlikeGasStationRequest): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    const gasStation = await prisma.gasStation.findUnique({
      where: { id: gasStationId }
    })

    if (!user) {
      throw new UserNotFound()
    }

    if (!gasStation) {
      throw new GasStationNotFound()
    }

    const like = await prisma.like.findUnique({
      where: { userId_gasStationId: { userId, gasStationId } }
    })

    if (!like) {
      throw new GasStationNotLikedYet()
    }

    await prisma.like.delete({
      where: { userId_gasStationId: { userId, gasStationId } }
    })
  }
}
