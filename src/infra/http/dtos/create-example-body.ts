import { z } from 'zod'

export const createExampleBody = z.object({
  message: z.string()
})
