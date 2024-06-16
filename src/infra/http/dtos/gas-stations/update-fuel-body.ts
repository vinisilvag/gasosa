import { z } from 'zod'

export const updateFuelBody = z.object({
  newName: z.string(),
  newPrice: z.number()
})
