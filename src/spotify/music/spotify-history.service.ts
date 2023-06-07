import { History } from '@core'
import { Injectable } from '@nestjs/common'
import * as Spotify from 'spotify-api.js'
import { SpotifyTrackMapper } from './spotify-track.service'

@Injectable()
export class SpotifyHistoryService {
  constructor(private readonly trackMapper: SpotifyTrackMapper) {}

  async list(user: number, accessToken: string, after?: Date): Promise<History[]> {
    const client = new Spotify.Client({ token: accessToken })
    const player = new Spotify.Player(client)

    // TODO: WTF does the `after` parameter expect a `string`?
    const recentlyPlayed = await player.getRecentlyPlayed({ limit: 50, after: after?.getTime().toString() })
    return this.toModel(user, recentlyPlayed)
  }

  toModel(userId: number, history: Spotify.RecentlyPlayed): History[] {
    return history.items.map((entry) => ({
      userId,
      track: this.trackMapper.toModel(entry.track),
      playedAt: new Date(entry.playedAt),
    }))
  }
}
