import { z } from 'zod'

export const fuelParams = z.object({
  fuelId: z.string().uuid()
})
