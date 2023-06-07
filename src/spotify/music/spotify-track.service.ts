import { Track } from '@core'
import { Injectable } from '@nestjs/common'
import { BaseMapper } from '@utils/mapper'
import * as Spotify from 'spotify-api.js'
import { SpotifyTrackID } from './spotify.identifiers'

@Injectable()
export class SpotifyTrackMapper extends BaseMapper<Track, Spotify.Track> {
  toSingleModel(track: Spotify.Track): Track {
    return {
      id: track.id,
      name: track.name,
      duration: track.duration,
      artists: track.artists.map((artist) => artist.id),
      spotifyId: track.id,
      bpm: null,
      globalIdentifiers: {
        ean: null,
        isrc: null,
        upc: null,
      },
    }
  }
  fromSingleModel(model: Track): Spotify.Track {
    throw new Error('Method not implemented.')
  }
}

@Injectable()
export class SpotifyTrackService {
  constructor(private readonly mapper: SpotifyTrackMapper) {}

  async getTrack(id: SpotifyTrackID): Promise<Track | null> {
    const client = new Spotify.Client({ token: '' })
    const spotifyTrack = await client.tracks.get(id)
    return this.mapper.toModel(spotifyTrack)
  }

  async getTracks(ids: SpotifyTrackID[]): Promise<Track[]> {
    const client = new Spotify.Client({ token: '' })
    const spotifyTracks = await client.tracks.getMultiple(ids)
    return spotifyTracks.map((track) => this.mapper.toModel(track))
  }
}
