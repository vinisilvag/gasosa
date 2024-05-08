import { Router } from 'express'

import { ExampleController } from '@infra/http/controllers/example-controller'

const exampleRoutes = Router()
const exampleController = new ExampleController()

exampleRoutes.get('/', exampleController.index)
exampleRoutes.post('/', exampleController.create)

export { exampleRoutes }
