import { Module } from '@nestjs/common'
import { CoreModule } from '../core'
import { SpotifyAuthModule } from './auth/spotify-auth.module'
import { SpotifyMusicModule } from './music/spotify-music.module'

@Module({
  imports: [CoreModule, SpotifyAuthModule, SpotifyMusicModule],
  exports: [SpotifyAuthModule, SpotifyMusicModule],
})
export class SpotifyModule {}
