import { type Request, type Response } from 'express'

import { prisma } from '@database/prisma'
import { z } from 'zod'

export const createExampleBody = z.object({
  message: z.string()
})

export class ExampleController {
  public async index(request: Request, response: Response) {
    const examples = await prisma.example.findMany()

    return response.status(200).json({ examples })
  }

  public async create(request: Request, response: Response) {
    const { message } = createExampleBody.parse(request.body)

    const example = await prisma.example.create({ data: { message } })

    return response.status(201).json({ example })
  }
}
