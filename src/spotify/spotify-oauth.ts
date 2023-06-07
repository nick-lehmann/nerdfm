import { z } from 'zod'

export const SpotifyOAuthCallbackData = z.object({
  authInfo: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    expires_in: z.number(),
  }),
  user: z.object({
    provider: z.string(),
    id: z.string(),
    username: z.string(),
    displayName: z.string(),
    profileUrl: z.string(),
    photos: z.array(z.unknown()),
    country: z.string(),
    followers: z.number(),
    product: z.string(),
    emails: z.array(z.object({ value: z.string(), type: z.null() })),
  }),
})
