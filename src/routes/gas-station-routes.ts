import { Router } from 'express'

import { GasStationController } from '@controllers/gas-station-controller'
import { ensureAuthenticated } from '@middlewares/ensure-authenticated'

const gasStationRoutes = Router()
const gasStationController = new GasStationController()

gasStationRoutes.post('/', gasStationController.create)
gasStationRoutes.get('/list', gasStationController.listStations)
gasStationRoutes.delete(
  '/del',
  ensureAuthenticated,
  gasStationController.deleteGasStation
);

gasStationRoutes.post(
  '/fuel',
  ensureAuthenticated,
  gasStationController.createFuel
)
gasStationRoutes.put(
  '/updateFuel',
  ensureAuthenticated,
  gasStationController.updateFuelPrice
)
gasStationRoutes.delete(
  '/delFuel',
  ensureAuthenticated,
  gasStationController.deleteFuel
);

export { gasStationRoutes }
