import { type Request, type Response } from 'express'
import { container } from 'tsyringe'

import { authenticateBody } from '@/infra/http/dtos/sessions/authenticate-body'

import { AuthenticateUser } from '@/application/services/sessions/authenticate-user'
import { AuthenticateGasStation } from '@/application/services/sessions/authenticate-gas-station'
import { GetUserProfile } from '@/application/services/sessions/get-user-profile'
import { GetGasStationProfile } from '@/application/services/sessions/get-gas-station-profile'

import { UserViewModel } from '@/infra/http/view-models/user-view-model'
import { GasStationViewModel } from '@/infra/http/view-models/gas-station-view-model'

export class SessionController {
  public async authenticateUser(request: Request, response: Response) {
    const { email, password } = authenticateBody.parse(request.body)

    const authenticateUser = container.resolve(AuthenticateUser)
    const { token, user } = await authenticateUser.execute({ email, password })

    return response
      .status(200)
      .json({ user: UserViewModel.toHTTP(user), token })
  }

  public async userProfile(request: Request, response: Response) {
    const { id: userId } = request.session

    const getUserProfile = container.resolve(GetUserProfile)
    const { user } = await getUserProfile.execute({ userId })

    return response.status(200).json({ user: UserViewModel.toHTTP(user) })
  }

  public async authenticateGasStation(request: Request, response: Response) {
    const { email, password } = authenticateBody.parse(request.body)

    const authenticateGasStation = container.resolve(AuthenticateGasStation)
    const { token, gasStation } = await authenticateGasStation.execute({
      email,
      password
    })

    return response
      .status(200)
      .json({ gasStation: GasStationViewModel.toHTTP(gasStation), token })
  }

  public async gasStationProfile(request: Request, response: Response) {
    const { id: gasStationId } = request.session

    const getGasStationProfile = container.resolve(GetGasStationProfile)
    const { gasStation } = await getGasStationProfile.execute({ gasStationId })

    return response
      .status(200)
      .json({ gasStation: GasStationViewModel.toHTTP(gasStation) })
  }
}
