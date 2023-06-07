import { z } from 'zod'

/**
 * Popularity score by Spotify.
 */
export const Popularity = z.number().int().min(0).max(100)
export type Popularity = z.infer<typeof Popularity>
