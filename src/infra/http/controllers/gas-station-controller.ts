import { type Request, type Response } from 'express'

import { filterPerNamesQuery } from '@/infra/http/dtos/gas-stations/filter-per-names-query'
import { filterPerDistanceQuery } from '@/infra/http/dtos/gas-stations/filter-per-distance.query'
import { showGasStationParams } from '@/infra/http/dtos/gas-stations/show-gas-station-params'
import { createGasStationBody } from '@/infra/http/dtos/gas-stations/create-gas-station-body'
import { createFuelBody } from '@/infra/http/dtos/gas-stations/create-fuel-body'
import { updateFuelBody } from '@/infra/http/dtos/gas-stations/update-fuel-body'
import { fuelParams } from '@/infra/http/dtos/gas-stations/fuel-params'

import { GetGasStationsPerName } from '@/application/services/gas-stations/get-gas-stations-per-name'
import { GetGasStationsPerDistance } from '@/application/services/gas-stations/get-gas-stations-per-distance'
import { ShowGasStation } from '@/application/services/gas-stations/show-gas-station'
import { CreateGasStation } from '@/application/services/gas-stations/create-gas-station'
import { DeleteGasStation } from '@/application/services/gas-stations/delete-gas-station'
import { CreateFuel } from '@/application/services/gas-stations/create-fuel'
import { UpdateFuel } from '@/application/services/gas-stations/update-fuel'
import { DeleteFuel } from '@/application/services/gas-stations/delete-fuel'

export class GasStationController {
  public async filterPerNames(request: Request, response: Response) {
    const { gasStationName, fuelName } = filterPerNamesQuery.parse(
      request.query
    )

    const getGasStationsPerName = new GetGasStationsPerName()
    const { gasStations } = await getGasStationsPerName.execute({
      gasStationName,
      fuelName
    })

    return response.status(200).json({ gasStations })
  }

  public async filterPerDistance(request: Request, response: Response) {
    const { userLatitude, userLongitude } = filterPerDistanceQuery.parse(
      request.query
    )

    const getGasStationsPerDistance = new GetGasStationsPerDistance()
    const { gasStations } = await getGasStationsPerDistance.execute({
      userLatitude,
      userLongitude
    })

    return response.status(200).json({ gasStations })
  }

  public async show(request: Request, response: Response) {
    const { gasStationId } = showGasStationParams.parse(request.params)

    const showGasStation = new ShowGasStation()
    const { gasStation } = await showGasStation.execute({ gasStationId })

    response.status(200).json({ gasStation })
  }

  public async create(request: Request, response: Response) {
    const { name, email, password, latitude, longitude } =
      createGasStationBody.parse(request.body)

    const createGasStation = new CreateGasStation()
    const { gasStation } = await createGasStation.execute({
      name,
      email,
      password,
      latitude,
      longitude
    })

    return response.status(201).json({ gasStation })
  }

  public async delete(request: Request, response: Response) {
    const { id: gasStationId } = request.session

    const deleteGasStation = new DeleteGasStation()
    await deleteGasStation.execute({ gasStationId })

    return response.status(204).send()
  }

  public async createFuel(request: Request, response: Response) {
    const { name, price } = createFuelBody.parse(request.body)
    const { id: gasStationId } = request.session

    const createFuel = new CreateFuel()
    const { fuel } = await createFuel.execute({ name, price, gasStationId })

    return response.status(201).json({ fuel })
  }

  public async updateFuelPrice(request: Request, response: Response) {
    const { newName, newPrice } = updateFuelBody.parse(request.body)
    const { fuelId } = fuelParams.parse(request.params)
    const { id: gasStationId } = request.session

    const updateFuel = new UpdateFuel()
    const { fuel } = await updateFuel.execute({
      newName,
      newPrice,
      fuelId,
      gasStationId
    })

    return response.status(200).json({ fuel })
  }

  public async deleteFuel(request: Request, response: Response) {
    const { fuelId } = fuelParams.parse(request.params)
    const { id: gasStationId } = request.session

    const deleteFuel = new DeleteFuel()
    await deleteFuel.execute({ fuelId, gasStationId })

    return response.status(204).send()
  }
}
