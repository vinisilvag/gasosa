import { Router } from 'express'

import { userRoutes } from './user-routes'
import { gasStationRoutes } from './gas-station-routes'
import { sessionRoutes } from './session-routes'

const appRoutes = Router()
appRoutes.use('/users', userRoutes)
appRoutes.use('/gas-stations', gasStationRoutes)
appRoutes.use('/sessions', sessionRoutes)

export { appRoutes }
