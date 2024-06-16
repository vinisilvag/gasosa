import { z } from 'zod'

export const filterPerNamesQuery = z.object({
  gasStationName: z.string().default(''),
  fuelName: z.string().default('')
})
