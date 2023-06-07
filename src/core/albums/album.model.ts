import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'
import { ExternalImage, GlobalIdentifiers, Popularity } from '../../utils'
import { Genre } from '../genres/genres.model'

export const AlbumID = z.string()
export type AlbumID = z.infer<typeof AlbumID>

export const BaseAlbumSchema = z.object({
  name: z.string(),
  type: z.enum(['album', 'single', 'compilation']).optional(),
  images: z.array(ExternalImage),
  releaseDate: z.date().optional(),
  globalIdentifiers: GlobalIdentifiers,
  genres: z.array(Genre),
  popularity: Popularity.optional(),
})

export const AlbumSchema = BaseAlbumSchema.merge(
  z.object({
    id: AlbumID,
  }),
)
export type AlbumSchema = z.infer<typeof AlbumSchema>

export class Album extends createZodDto(AlbumSchema) {}
