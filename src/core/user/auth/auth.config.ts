import { IsString } from 'class-validator'

export class AuthConfig {
  @IsString()
  // @IsNotEmpty()
  secret!: string
}
