import { Router } from 'express'

import { exampleRoutes } from './example-routes'

const appRoutes = Router()
appRoutes.use('/examples', exampleRoutes)

export { appRoutes }
