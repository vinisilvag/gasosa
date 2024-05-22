import { type Request, type Response } from 'express'
import { getDistance } from 'geolib'
import { AppError } from '@helpers/app-error'

import { prisma } from '@database/prisma'
import { z } from 'zod'

import { hash } from 'bcrypt'
import { GasStationViewModel } from '@view-models/gas-station-view-model'

const createGasStationBody = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  latitude: z.number(),
  longitude: z.number()
})

const createFuelBody = z.object({
  name: z.string(),
  price: z.number()
})

export class GasStationController {
  public async create(request: Request, response: Response) {
    const { name, email, password, latitude, longitude } =
      createGasStationBody.parse(request.body)

    const gasStationExists = await prisma.gasStation.findUnique({
      where: { email }
    })

    if (!gasStationExists) {
      const hashedPassword = await hash(password, 10)

      const gasStation = await prisma.gasStation.create({
        data: {
          name,
          email,
          password: hashedPassword,
          latitude,
          longitude
        }
      })

      return response
        .status(201)
        .json({ gasStation: GasStationViewModel.toHTTP(gasStation) })
    } else {
      throw new AppError(409, 'Email already registered.')
    }
  }

  public async listStations(request: Request, response: Response) {
    const { fuelType, userLatitude, userLongitude } = request.query;
  
    if (userLatitude && userLongitude) {
      try {
        const gasStations = await prisma.gasStation.findMany({
          include: {
            fuels: true
          }
        });
  
        const userCoords = { latitude: Number(userLatitude), longitude: Number(userLongitude) };
        gasStations.sort((a, b) => {
          const distanceA = getDistance(userCoords, { latitude: a.latitude, longitude: a.longitude });
          const distanceB = getDistance(userCoords, { latitude: b.latitude, longitude: b.longitude });
  
          return distanceA - distanceB;
        });
  
        return response.status(200).json({ gasStations: gasStations });
      } catch (error) {
        throw new AppError(500, 'Internal Server Error.');
      }
    } else if (fuelType) {
      try {
        const gasStations = await prisma.gasStation.findMany({
          include: {
            fuels: true
          }
        });
  
        const filteredGasStations = gasStations.filter(gs => 
          gs.fuels.some(fuel => fuel.name.toLowerCase() === fuelType)
        );
  
        filteredGasStations.sort((a, b) => {
          const fuelA = a.fuels.find(fuel => fuel.name.toLowerCase() === fuelType);
          const fuelB = b.fuels.find(fuel => fuel.name.toLowerCase() === fuelType);
  
          return fuelA.price - fuelB.price;
        });
  
        return response.status(200).json({ gasStations: filteredGasStations });
      } catch (error) {
        throw new AppError(500, 'Internal Server Error.');
      }
    } else {
      throw new AppError(400, 'Either fuel type or user coordinates are required.');
    }
  }

  public async deleteGasStation(request: Request, response: Response) {
    const { id: gasStationId } = request.session;
  
    try {
      await prisma.gasStation.delete({
        where: {
          id: gasStationId,
        },
      });
  
      return response.status(200).json({ message: 'Gas station and associated fuels deleted successfully.' });
    } catch (error) {
      throw new AppError(500, 'Internal Server Error.');
    }
  }
  

  public async createFuel(request: Request, response: Response) {
    const { name, price } = createFuelBody.parse(request.body)
    const { id: gasStationId } = request.session

    const gasStation = await prisma.gasStation.findUnique({
      where: { id: gasStationId }
    })

    if (!gasStation) {
      throw new AppError(404, 'Authenticated gas station not found.')
    }

    const fuel = await prisma.fuel.create({
      data: {
        name,
        price,
        gasStationId
      }
    })

    return response.status(201).json({ fuel })    
  }

  public async updateFuelPrice(request: Request, response: Response) {
    const { fuelName, newPrice } = request.body;
    const { id: gasStationId } = request.session

    try {
      const fuelToUpdate = await prisma.fuel.findFirst({
        where: {
          gasStationId,
          name: fuelName,
        },
      });

      if (!fuelToUpdate) {
        throw new AppError(404, 'Fuel not found for this gas station.');
      }

      const updatedFuel = await prisma.fuel.update({
        where: {
          id: fuelToUpdate.id,
        },
        data: {
          price: newPrice,
        },
      });

      return response.status(200).json({ message: 'Fuel price updated successfully.' });
    } catch (error) {
      throw new AppError(500, 'Internal Server Error.');
    }
  }

  public async deleteFuel(request: Request, response: Response) {
    const { fuelName } = request.body;
    const { id: gasStationId } = request.session

    try {
      const fuelToDelete = await prisma.fuel.findFirst({
        where: {
          gasStationId,
          name: fuelName,
        },
      });

      if (!fuelToDelete) {
        throw new AppError(404, 'Fuel not found for this gas station.');
      }

      await prisma.fuel.delete({
        where: {
          id: fuelToDelete.id,
        },
      });

      return response.status(200).json({ message: 'Fuel deleted successfully.' });
    } catch (error) {
      throw new AppError(500, 'Internal Server Error.');
    }
  }
}
