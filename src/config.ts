import { Type } from 'class-transformer'
import { IsNumber, IsString, ValidateNested } from 'class-validator'
import { AuthConfig } from './core/user/auth/auth.config'
import { SpotifyConfig } from './spotify/spotify.config'

export class NetworkConfig {
  @IsString()
  protocol = 'http'

  @IsString()
  host = 'localhost'

  @IsNumber()
  port = 3000
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