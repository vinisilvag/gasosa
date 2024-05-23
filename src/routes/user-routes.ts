import { Router } from 'express'

import { UserController } from '@controllers/user-controller'
import { ensureAuthenticated } from '@middlewares/ensure-authenticated'

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
