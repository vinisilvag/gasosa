import { Router } from 'express'

import { GasStationController } from '@controllers/gas-station-controller'
import { ensureAuthenticated } from '@middlewares/ensure-authenticated'

const gasStationRoutes = Router()
const gasStationController = new GasStationController()

gasStationRoutes.post('/', gasStationController.create)
gasStationRoutes.post(
  '/fuel',
  ensureAuthenticated,
  gasStationController.createFuel
)

export { gasStationRoutes }
