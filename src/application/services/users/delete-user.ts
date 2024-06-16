import { prisma } from '@/infra/database/prisma/client'

import { UserNotFound } from '@/application/errors/users/user-not-found'

interface DeleteUserRequest {
  userId: number
}

export class DeleteUser {
  async execute({ userId }: DeleteUserRequest): Promise<void> {
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) {
      throw new UserNotFound()
    }

    await prisma.user.delete({
      where: {
        id: userId
      }
    })
  }
}
