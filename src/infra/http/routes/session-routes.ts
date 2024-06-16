import { Router } from 'express'

import { SessionController } from '@/infra/http/controllers/session-controller'
import { ensureAuthenticated } from '@/infra/http/middlewares/ensure-authenticated'

const sessionRoutes = Router()
const sessionController = new SessionController()

sessionRoutes.post('/users/authenticate', sessionController.authenticateUser)
sessionRoutes.get(
  '/users/profile',
  ensureAuthenticated,
  sessionController.userProfile
)
sessionRoutes.post(
  '/gas-stations/authenticate',
  sessionController.authenticateGasStation
)
sessionRoutes.get(
  '/gas-stations/profile',
  ensureAuthenticated,
  sessionController.gasStationProfile
)

export { sessionRoutes }
