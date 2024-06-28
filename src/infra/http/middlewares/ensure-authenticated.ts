import { type Request, type Response, type NextFunction } from 'express'

import { verify } from 'jsonwebtoken'
import { SECRET } from '@/config/env/auth'

import { MissingJwt } from '@/application/errors/sessions/missing-jwt'
import { InvalidJwt } from '@/application/errors/sessions/invalid-jwt'

interface TokenPayload {
  iat: number
  exp: number
  id: string
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new MissingJwt()
  }

  const [_, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, SECRET)
    const { id } = decoded as TokenPayload

    request.session = {
      id
    }

    next()
  } catch (err) {
    throw new InvalidJwt()
  }
}
