import { AuthService, UserID, UserService } from '@core'
import { User } from '@core/user/user.decorator'
import { Controller, Get, Logger, Req, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { SpotifyToken } from '@prisma/client'
import { Request, Response } from 'express'
import { SpotifyOAuthCallbackData } from '../spotify-oauth'
import { SpotifyConfig } from '../spotify.config'
import { SpotifyOAuthScope, scopesToParam } from './scope'
import { SpotifyTokenService } from './spotify-token.service'
import { SpotifyGuard } from './spotify.guard'

@Controller('spotify/auth')
export class SpotifyAuthController {
  private readonly logger: Logger = new Logger(SpotifyAuthController.name)

  constructor(
    private readonly config: SpotifyConfig,
    private readonly authService: AuthService,
    private readonly tokenService: SpotifyTokenService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(SpotifyGuard)
  @Get('login')
  login(): void {
    return
  }

  // TODO: Do not use the platform-dependent Response type
  @UseGuards(SpotifyGuard)
  @Get('callback')
  async callback(@Req() request: any, @Res() response: Response): Promise<Response> {
    this.logger.log('Received callback from spotify')
    const { user, authInfo } = SpotifyOAuthCallbackData.parse(request)
    this.logger.log({ user, authInfo })

    if (!user) {
      response.redirect('/')
      return response
    }

    const existingUser =
      (await this.userService.getByName(user.username)) ?? (await this.userService.create({ name: user.username }))

    const expiresAt = new Date()
    expiresAt.setSeconds(expiresAt.getSeconds() + authInfo.expires_in)
    const token: SpotifyToken = {
      userId: existingUser.id,
      accessToken: authInfo.accessToken,
      refreshToken: authInfo.refreshToken,
      expiresAt,
      scopes: scopesToParam([
        SpotifyOAuthScope.UserReadPrivate,
        SpotifyOAuthScope.UserReadEmail,
        SpotifyOAuthScope.PlaylistReadPrivate,
        SpotifyOAuthScope.UserLibraryRead,
        SpotifyOAuthScope.UserReadPlaybackState,
      ]),
    }
    await this.tokenService.upsert(token)

    request.user = undefined
    const jwt = this.authService.login({ userId: existingUser.id })
    return response.status(201).json(jwt)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('info')
  async info(@Req() request: Request) {
    console.log(request.user)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('info2')
  async info2(@User() userID: UserID) {
    this.logger.log(userID)
    return userID
  }
}
