import { z } from 'zod'

export const showGasStationParams = z.object({
  gasStationId: z.coerce.number()
})
