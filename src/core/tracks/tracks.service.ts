import { PrismaService } from '@db/prisma.service'
import { HttpException, Injectable } from '@nestjs/common'
import { Track as DbTrack } from '@prisma/client'
import { BaseMapper } from '@utils/mapper'
import { CreateTrack, Track, TrackID } from './track.model'

class TrackMapper extends BaseMapper<Track, DbTrack> {
  toSingleModel(track: DbTrack): Track {
    return {
      ...track,
      bpm: track.bpm,
      artists: [],
      globalIdentifiers: {
        ean: track.ean,
        isrc: track.isrc,
        upc: track.upc,
      },
    }
  }

  fromSingleModel(track: Track): DbTrack {
    const { globalIdentifiers } = track
    return {
      ...track,
      ...globalIdentifiers,
    }
  }
}

@Injectable()
export class TracksService {
  private readonly mapper = new TrackMapper()

  constructor(private readonly db: PrismaService) {}

  async upsert(track: CreateTrack, id?: TrackID): Promise<Track> {
    const newTrack: DbTrack = await this.db.track.upsert({
      create: track,
      update: track,
      where: { id },
    })
    return this.mapper.toModel(newTrack)
  }

  async list(): Promise<Track[]> {
    const result = await this.db.track.findMany({ include: { artists: true } })
    return []
  }

  async get(id: TrackID): Promise<Track | null> {
    const track = await this.db.track.findUnique({ where: { id } })
    if (!track) return null
    return this.mapper.toModel(track)
  }

  async update(id: TrackID, track: Partial<Track>): Promise<Track> {
    throw new HttpException('Not implemented', 500)
  }

  async remove(id: TrackID) {
    return `This action removes a #${id} track`
  }
}
