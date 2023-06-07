import { CoreModule } from '@core'
import { PrismaModule } from '@db/prisma.module'
import { Module } from '@nestjs/common'
import { SpotifyAuthController } from './spotify-auth.controller'
import { SpotifyTokenService } from './spotify-token.service'
import { SpotifyGuard } from './spotify.guard'
import { SpotifyStrategy } from './spotify.strategy'

@Module({
  imports: [PrismaModule, CoreModule],
  controllers: [SpotifyAuthController],
  providers: [SpotifyTokenService, SpotifyStrategy, SpotifyGuard],
  exports: [SpotifyTokenService, SpotifyStrategy, SpotifyGuard],
})
export class SpotifyAuthModule {}
