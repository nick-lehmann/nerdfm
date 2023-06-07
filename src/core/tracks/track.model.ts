import { ArtistID } from '@core/artists'
import { GlobalIdentifiers, Popularity } from '@utils'
import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const TrackID = z.string()
export type TrackID = z.infer<typeof TrackID>

export const BaseTrackSchema = z.object({
  name: z.string(),
  duration: z.number(),
  popularity: Popularity.optional(),
  globalIdentifiers: GlobalIdentifiers,
  bpm: z.number().nullable(),
  artists: z.array(ArtistID),

  spotifyId: z.string().nullable(),
})

export const CreateTrackSchema = BaseTrackSchema

export class CreateTrack extends createZodDto(CreateTrackSchema) {}

export const TrackSchema = BaseTrackSchema.merge(
  z.object({
    id: TrackID,
  }),
)

export class Track extends createZodDto(TrackSchema) {}
