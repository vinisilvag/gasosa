import { Router } from 'express'

import { GasStationController } from '@controllers/gas-station-controller'
import { ensureAuthenticated } from '@middlewares/ensure-authenticated'

const gasStationRoutes = Router()
const gasStationController = new GasStationController()

gasStationRoutes.get('/', gasStationController.filterPerNames)
gasStationRoutes.get('/distances', gasStationController.filterPerDistance)
gasStationRoutes.get('/:gasStationId', gasStationController.show)
gasStationRoutes.post('/', gasStationController.create)
gasStationRoutes.delete(
  '/account',
  ensureAuthenticated,
  gasStationController.delete
)

gasStationRoutes.post(
  '/fuel',
  ensureAuthenticated,
  gasStationController.createFuel
)
gasStationRoutes.put(
  '/fuel/:fuelId',
  ensureAuthenticated,
  gasStationController.updateFuelPrice
)
gasStationRoutes.delete(
  '/fuel/:fuelId',
  ensureAuthenticated,
  gasStationController.deleteFuel
)

export { gasStationRoutes }
