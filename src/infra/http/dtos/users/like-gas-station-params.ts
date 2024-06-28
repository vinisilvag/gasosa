import { z } from 'zod'

export const likeGasStationParams = z.object({
  gasStationId: z.string().uuid()
})
