import { type Request, type Response } from 'express'
import { AppError } from '@helpers/app-error'

import { prisma } from '@database/prisma'
import { z } from 'zod'

import { hash } from 'bcrypt'
import { UserViewModel } from '@view-models/user-view-model'

const createUserBody = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6)
})

export class UserController {
  public async create(request: Request, response: Response) {
    const { name, email, password } = createUserBody.parse(request.body)

    const userExists = await prisma.user.findUnique({
      where: { email }
    })

    if (!userExists) {
      const hashedPassword = await hash(password, 10)

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword
        }
      })

      return response.status(201).json({ user: UserViewModel.toHTTP(user) })
    } else {
      throw new AppError(409, 'Email already registered.')
    }
  }
}
