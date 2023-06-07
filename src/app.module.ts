import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { ScheduleModule } from '@nestjs/schedule'
import { TypedConfigModule, fileLoader } from 'nest-typed-config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Config } from './config'
import { CoreModule } from './core/core.module'
import { FetcherModule } from './fetcher/fetcher.module'
import { PrismaModule } from './prisma/prisma.module'
import { SpotifyModule } from './spotify/spotify.module'

@Module({
  imports: [
    PassportModule,
    ScheduleModule.forRoot(),
    TypedConfigModule.forRoot({
      schema: Config,
      load: fileLoader({
        // basename: 'config',
        absolutePath: '/Users/nick/Projekte/spotimy-nest/config.yml',
      }),
    }),
    PrismaModule,
    // TracksModule,
    SpotifyModule,
    FetcherModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
