import { z } from 'zod'

export const createGasStationBody = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  latitude: z.number(),
  longitude: z.number()
})
