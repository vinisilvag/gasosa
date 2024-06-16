import { z } from 'zod'

export const filterPerDistanceQuery = z.object({
  userLatitude: z.coerce.number(),
  userLongitude: z.coerce.number()
})
