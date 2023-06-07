import { z } from 'zod'

export const JwtPayload = z.object({
  userId: z.number(),
})
export type JwtPayload = z.infer<typeof JwtPayload>
