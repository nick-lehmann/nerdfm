import { AuthConfig } from '@core'
import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { SpotifyConfig } from '../spotify/spotify.config'

export class NetworkConfig {
  @IsString()
  protocol = 'http'

  @IsString()
  host = 'localhost'

  @IsString()
  @IsOptional()
  path = ''

  @IsNumber()
  port = 3000

  get url(): string {
    return `${this.protocol}//${this.host}:${this.port}`
  }
}

export class Config {
  @Type(() => SpotifyConfig)
  @ValidateNested()
  spotify!: SpotifyConfig

  @Type(() => AuthConfig)
  @ValidateNested()
  auth!: AuthConfig

  @Type(() => NetworkConfig)
  @ValidateNested()
  network!: NetworkConfig
}
