import { Router } from 'express'

import { SessionController } from '@controllers/session-controller'

import { ensureAuthenticated } from '@middlewares/ensure-authenticated'

const sessionRoutes = Router()
const sessionController = new SessionController()

sessionRoutes.get('/profile', ensureAuthenticated, sessionController.index)
sessionRoutes.post('/authenticate', sessionController.authenticate)

export { sessionRoutes }
