import { type Request, type Response } from 'express'
import { container } from 'tsyringe'

import { createUserBody } from '@/infra/http/dtos/users/create-user-body'
import { likeGasStationParams } from '@/infra/http/dtos/users/like-gas-station-params'

import { CreateUser } from '@/application/services/users/create-user'
import { DeleteUser } from '@/application/services/users/delete-user'
import { GetLikes } from '@/application/services/users/get-likes'
import { LikeGasStation } from '@/application/services/users/like-gas-station'
import { UnlikeGasStation } from '@/application/services/users/unlike-gas-station'

export class UserController {
  public async create(request: Request, response: Response) {
    const { name, email, password } = createUserBody.parse(request.body)

    const createUser = container.resolve(CreateUser)
    const { user } = await createUser.execute({ name, email, password })

    return response.status(201).json({ user })
  }

  public async delete(request: Request, response: Response) {
    const { id: userId } = request.session

    const deleteUser = container.resolve(DeleteUser)
    await deleteUser.execute({ userId })

    return response.status(204).send()
  }

  public async likesList(request: Request, response: Response) {
    const { id: userId } = request.session

    const getLikes = container.resolve(GetLikes)
    const { likes } = await getLikes.execute({ userId })

    return response.status(200).json({ likes })
  }

  public async likeGasStation(request: Request, response: Response) {
    const { gasStationId } = likeGasStationParams.parse(request.params)
    const { id: userId } = request.session

    const likeGasStation = container.resolve(LikeGasStation)
    await likeGasStation.execute({ gasStationId, userId })

    return response.status(204).send()
  }

  public async unlikeGasStation(request: Request, response: Response) {
    const { gasStationId } = likeGasStationParams.parse(request.params)
    const { id: userId } = request.session

    const unlikeGasStation = container.resolve(UnlikeGasStation)
    await unlikeGasStation.execute({ gasStationId, userId })

    return response.status(204).send()
  }
}
