import { z } from 'zod'

export const SpotifyUserID = z.string()
export type SpotifyUserID = z.infer<typeof SpotifyUserID>

export const SpotifyTrackID = z.string()
export type SpotifyTrackID = z.infer<typeof SpotifyTrackID>
