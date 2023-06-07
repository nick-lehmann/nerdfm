import { z } from 'zod'
import { TrackID, TrackSchema } from '../tracks'
import { UserID } from '../user'

export const History = z.object({
  userId: UserID,
  track: z.union([TrackID, TrackSchema]),
  playedAt: z.date(),
})
export type History = z.infer<typeof History>
