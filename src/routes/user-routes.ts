import { Router } from 'express'

import { UserController } from '@controllers/user-controller'
import { ensureAuthenticated } from '@middlewares/ensure-authenticated'

const userRoutes = Router()
const userController = new UserController()

userRoutes.post('/', userController.create)
userRoutes.get('/name', ensureAuthenticated, userController.gasStationsPerName)

export { userRoutes }
