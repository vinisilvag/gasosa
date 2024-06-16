import { Router } from 'express'

import { UserController } from '@/infra/http/controllers/user-controller'
import { ensureAuthenticated } from '@/infra/http/middlewares/ensure-authenticated'

const userRoutes = Router()
const userController = new UserController()

userRoutes.post('/', userController.create)
userRoutes.delete('/account', ensureAuthenticated, userController.delete)
userRoutes.get('/likes', ensureAuthenticated, userController.likesList)
userRoutes.post(
  '/like/:gasStationId',
  ensureAuthenticated,
  userController.likeGasStation
)
userRoutes.delete(
  '/unlike/:gasStationId',
  ensureAuthenticated,
  userController.unlikeGasStation
)

export { userRoutes }
