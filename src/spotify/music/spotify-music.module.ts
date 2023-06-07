import { Module } from '@nestjs/common'
import { SpotifyHistoryService } from './spotify-history.service'
import { SpotifyTrackMapper, SpotifyTrackService } from './spotify-track.service'

@Module({
  providers: [SpotifyTrackService, SpotifyTrackMapper, SpotifyHistoryService],
  exports: [SpotifyTrackService, SpotifyHistoryService],
})
export class SpotifyMusicModule {}
