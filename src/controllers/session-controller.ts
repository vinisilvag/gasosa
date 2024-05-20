import { type Request, type Response } from 'express'
import { AppError } from '@helpers/app-error'

import { prisma } from '@database/prisma'
import { z } from 'zod'

import { compare } from 'bcrypt'

import { SECRET } from '@config/env/auth'
import { sign } from 'jsonwebtoken'
import { UserViewModel } from '@view-models/user-view-model'

export const authenticateUserBody = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export class SessionController {
  public async index(request: Request, response: Response) {
    const { id: userId } = request.user

    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (user) {
      return response.status(200).json({ user: UserViewModel.toHTTP(user) })
    } else {
      throw new AppError(404, 'User not found.')
    }
  }

  public async authenticate(request: Request, response: Response) {
    const { email, password } = authenticateUserBody.parse(request.body)

    const user = await prisma.user.findUnique({ where: { email } })

    if (user) {
      const passwordMatch = await compare(password, user.password)

      if (passwordMatch) {
        const token = sign({ id: user.id }, SECRET, {
          expiresIn: '7d'
        })

        return response
          .status(200)
          .json({ user: UserViewModel.toHTTP(user), token })
      } else {
        throw new AppError(401, 'Invalid email/password combination.')
      }
    } else {
      throw new AppError(404, 'User not found.')
    }
  }
}
