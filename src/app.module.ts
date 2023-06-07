import { Module, OnModuleInit } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { ScheduleModule } from '@nestjs/schedule'
import { TypedConfigModule, dotenvLoader, fileLoader } from 'nest-typed-config'
import * as path from 'path'
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
      load: [
        dotenvLoader(),
        fileLoader({
          absolutePath: path.join(process.cwd(), 'config', 'config.local.yml'),
          ignoreEnvironmentVariableSubstitution: false,
        }),
      ],
      isGlobal: true,
    }),
    PrismaModule,
    SpotifyModule,
    FetcherModule,
    CoreModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly config: Config) {}

  onModuleInit() {
    console.debug('Config:', this.config)
  }
}
