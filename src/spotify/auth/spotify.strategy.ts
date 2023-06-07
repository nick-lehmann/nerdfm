import { Injectable, Logger } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy, VerifyCallback } from 'passport-spotify'
import { NetworkConfig } from '../../config/config'
import { SpotifyConfig } from '../spotify.config'
import { SpotifyOAuthScope, scopesToParam } from './scope'

@Injectable()
export class SpotifyStrategy extends PassportStrategy(Strategy, 'spotify') {
  private readonly logger: Logger = new Logger('SpotifyStrategy')

  constructor(private readonly config: SpotifyConfig, private readonly networkConfig: NetworkConfig) {
    super(
      {
        clientID: config.clientId,
        clientSecret: config.clientSecret,
        callbackURL: networkConfig.url,
        scope: scopesToParam([
          SpotifyOAuthScope.UserReadPrivate,
          SpotifyOAuthScope.UserReadEmail,
          SpotifyOAuthScope.PlaylistReadPrivate,
          SpotifyOAuthScope.UserLibraryRead,
          SpotifyOAuthScope.UserReadPlaybackState,
          SpotifyOAuthScope.UserReadRecentlyPlayed,
        ]),
      },
      (accessToken: string, refreshToken: string, expires_in: number, profile: Profile, done: VerifyCallback): void => {
        return done(null, profile, { accessToken, refreshToken, expires_in })
      },
    )
    this.logger.log('Create spotify strategy', JSON.stringify(config), networkConfig.url)
  }
}
