import { Router } from 'express'

import { userRoutes } from './user-routes'
import { sessionRoutes } from './session-routes'

const appRoutes = Router()
appRoutes.use('/users', userRoutes)
appRoutes.use('/sessions', sessionRoutes)

export { appRoutes }
