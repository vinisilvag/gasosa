import { inject as Inject, injectable as Injectable } from 'tsyringe'
import { type UsersRepository } from '@/application/repositories/users-repository'

import { UserNotFound } from '@/application/errors/users/user-not-found'

interface DeleteUserRequest {
  userId: string
}

@Injectable()
export class DeleteUser {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository
  ) {}

  async execute({ userId }: DeleteUserRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotFound()
    }

    await this.usersRepository.delete(userId)
  }
}
