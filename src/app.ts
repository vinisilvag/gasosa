import 'express-async-errors'
import 'reflect-metadata'

import '@/config/env'
import '@/shared/container'

import express from 'express'

import cors from 'cors'

import { appRoutes } from '@/infra/http/routes/index'
import { errorHandler } from '@/infra/http/middlewares/error-handler'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1', appRoutes)
app.use(errorHandler)

export { app }
