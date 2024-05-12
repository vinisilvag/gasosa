import { type Request, type Response, type NextFunction } from 'express'

import { verify } from 'jsonwebtoken'
import { SECRET } from '@config/env/auth'

import { AppError } from '@helpers/app-error'

interface TokenPayload {
  iat: number
  exp: number
  id: number
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError(401, 'Missing JWT token.')
  }

  const [_, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, SECRET)
    const { id } = decoded as TokenPayload

    request.user = {
      id
    }

    next()
  } catch (err) {
    throw new AppError(401, 'Invalid JWT token.')
  }
}
