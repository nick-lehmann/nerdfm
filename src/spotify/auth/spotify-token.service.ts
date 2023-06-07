import { Injectable } from '@nestjs/common'
import type { SpotifyToken } from '@prisma/client'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class SpotifyTokenService {
  constructor(private readonly db: PrismaService) {}

  async create(token: SpotifyToken): Promise<SpotifyToken> {
    return this.db.spotifyToken.create({ data: token })
  }

  async upsert(token: SpotifyToken): Promise<SpotifyToken> {
    return this.db.spotifyToken.upsert({
      create: token,
      update: token,
      where: { userId: token.userId },
    })
  }

  async findByUser(userId: number): Promise<SpotifyToken | null> {
    return this.db.spotifyToken.findFirst({ where: { userId } })
  }
}
