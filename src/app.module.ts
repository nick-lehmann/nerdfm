import { Module, OnModuleInit } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { ScheduleModule } from '@nestjs/schedule'
import { Config } from './config/config'
import { ConfigModule } from './config/config.module'
import { CoreModule } from './core/core.module'
import { FetcherModule } from './fetcher/fetcher.module'
import { PrismaModule } from './prisma/prisma.module'
import { SpotifyModule } from './spotify/spotify.module'

@Module({
  imports: [
    ConfigModule.forRoot({}),
    PassportModule,
    ScheduleModule.forRoot(),
    PrismaModule,
    SpotifyModule,
    FetcherModule,
    CoreModule,
    ConfigModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly config: Config) {}

  onModuleInit() {
    console.debug('Config:', this.config)
  }
}
