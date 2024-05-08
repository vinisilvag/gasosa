import { type Request, type Response } from 'express'

import { CreateExample } from '@application/services/examples/create-example'
import { ListExamples } from '@application/services/examples/list-examples'

import { createExampleBody } from '@infra/http/dtos/create-example-body'

export class ExampleController {
  public async index(request: Request, response: Response) {
    const listExamples = new ListExamples()

    const { examples } = await listExamples.execute()

    return response.status(200).json({ examples })
  }

  public async create(request: Request, response: Response) {
    const { message } = createExampleBody.parse(request.body)

    const createExample = new CreateExample()
    const { example } = await createExample.execute({ message })

    return response.status(201).json({ example })
  }
}
