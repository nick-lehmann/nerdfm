// export const AuthConfig = {
//   secret: z.string(),
// }

import { IsString } from 'class-validator'

export class AuthConfig {
  @IsString()
  secret!: string
}
