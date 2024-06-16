import { z } from 'zod'

export const createFuelBody = z.object({
  name: z.string(),
  price: z.number()
})
