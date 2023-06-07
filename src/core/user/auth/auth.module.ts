import { JwtStrategy } from '@core/user/auth/jwt.strategy'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthConfig } from './auth.config'
import { AuthService } from './auth.service'

@Module({
  imports: [
    JwtModule.registerAsync({
      // TODO: Get secret and TTL from config
      useFactory: async () => {
        return {
          secret: 'foobarbaz',
          signOptions: {
            expiresIn: 60 * 60, // seconds
          },
        }
      },
      inject: [AuthConfig],
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
