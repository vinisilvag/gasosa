import { z } from 'zod'

export const authenticateBody = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})
