import { IsString } from 'class-validator'

export class AuthConfig {
  @IsString()
  secret!: string
}
