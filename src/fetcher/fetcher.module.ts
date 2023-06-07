import { Module } from '@nestjs/common'
import { CoreModule } from '../core/core.module'
import { SpotifyModule } from '../spotify/spotify.module'
import { FetcherController } from './fetcher.controller'
import { FetcherService } from './fetcher.service'

@Module({
  imports: [CoreModule, SpotifyModule],
  providers: [FetcherService],
  controllers: [FetcherController],
})
export class FetcherModule {}
