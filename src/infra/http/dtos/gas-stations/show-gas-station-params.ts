import { z } from 'zod'

export const showGasStationParams = z.object({
  gasStationId: z.string().uuid()
})
