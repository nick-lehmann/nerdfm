import { IsString } from 'class-validator'

export class SpotifyConfig {
  @IsString()
  clientId!: string

  @IsString()
  clientSecret!: string
}
