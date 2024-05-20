import { type Request, type Response } from 'express'
import { AppError } from '@helpers/app-error'

import { prisma } from '@database/prisma'
import { z } from 'zod'

import { hash } from 'bcrypt'
import { UserViewModel } from '@view-models/user-view-model'

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  type: z.literal('user'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  gasPrice: z.number().optional()
})

const gasStationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  type: z.literal('gas-station'),
  latitude: z.number(),
  longitude: z.number(),
  gasPrice: z.number()
})

const createUserBody = z.discriminatedUnion('type', [
  userSchema,
  gasStationSchema
])

const listGasStationsQuery = z.object({
  filter: z.string().default('')
})

export class UserController {
  public async create(request: Request, response: Response) {
    const { name, email, password, type, latitude, longitude, gasPrice } =
      createUserBody.parse(request.body)

    const userExists = await prisma.user.findUnique({ where: { email } })

    if (!userExists) {
      const hashedPassword = await hash(password, 10)

      let user = null
      if (type === 'user') {
        user = await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
            type
          }
        })
      } else {
        user = await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
            type,
            latitude,
            longitude,
            gasPrice
          }
        })
      }

      return response.status(201).json({ user: UserViewModel.toHTTP(user) })
    } else {
      throw new AppError(409, 'Email already registered.')
    }
  }

  public async gasStationsPerName(request: Request, response: Response) {
    const { filter } = listGasStationsQuery.parse(request.query)

    const gasStations = await prisma.user.findMany({
      where: { type: { equals: 'gas-station' }, name: { contains: filter } }
    })

    return response.status(200).json({ gasStations })
  }
}
