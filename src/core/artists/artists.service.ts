import { PrismaService } from '@db/prisma.service'
import { Injectable, Logger } from '@nestjs/common'
import { Artist } from '@prisma/client'
import { CreateArtistModel } from './artist.model'

@Injectable()
export class ArtistsService {
  private readonly logger = new Logger()

  constructor(private readonly db: PrismaService) {}

  async list(): Promise<Artist[]> {
    return this.db.artist.findMany()
  }

  async create(artist: CreateArtistModel): Promise<Artist> {
    this.logger.debug('Create artist', { artist })
    return this.db.artist.create({
      data: {
        name: artist.name,
      },
    })
  }
}
