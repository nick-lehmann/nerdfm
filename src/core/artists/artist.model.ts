import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'
import { ExternalImage, Popularity } from '../../utils'
import { Genre } from '../genres/genres.model'

export const ArtistID = z.string()
export type ArtistID = z.infer<typeof ArtistID>

const BaseArtistSchema = z.object({
  name: z.string(),
  genres: z.array(Genre),
  images: z.array(ExternalImage),
  popularity: Popularity.optional(),
})

export const CreateArtistSchema = BaseArtistSchema
export class CreateArtistModel extends createZodDto(CreateArtistSchema) {}

export const ArtistSchema = BaseArtistSchema.merge(
  z.object({
    id: z.number(),
  }),
)
export class ArtistModel extends createZodDto(ArtistSchema) {}
