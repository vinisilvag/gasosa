import { Router } from 'express'

import { GasStationController } from '@controllers/gas-station-controller'

const gasStationRoutes = Router()
const gasStationController = new GasStationController()

gasStationRoutes.post('/', gasStationController.create)
gasStationRoutes.get('/name', gasStationController.gasStationsPerName)

export { gasStationRoutes }
