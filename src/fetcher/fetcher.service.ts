import { HistoryService, TracksService, User, UserService } from '@core'
import { Injectable, Logger } from '@nestjs/common'
import { SpotifyTokenService } from '../spotify/auth/spotify-token.service'
import { SpotifyHistoryService } from '../spotify/music/spotify-history.service'

const EVERY_FIVE_MINUTES_CRON = '*/5 * * * *'

@Injectable()
export class FetcherService {
  private readonly logger: Logger = new Logger(FetcherService.name)

  constructor(
    private readonly userService: UserService,
    private readonly tracksService: TracksService,
    private readonly historyService: HistoryService,
    private readonly tokenService: SpotifyTokenService,
    private readonly spotifyHistoryService: SpotifyHistoryService,
  ) {}

  // @Cron(EVERY_FIVE_MINUTES_CRON)
  async fetch(): Promise<void> {
    const users = await this.userService.list()
    this.logger.log(`Starting new fetch for ${users.length} users`)

    for (const user of users) {
      await this.fetchForUser(user)
    }
  }

  async fetchForUser(user: User): Promise<{ added: number } | undefined> {
    const token = await this.tokenService.findByUser(user.id)
    if (token === null) return

    this.logger.log(`Ask for user ${user.name} with token ${token.accessToken}`)

    const lastHistoryEntry = await this.historyService.last(user.id)
    const history = await this.spotifyHistoryService.list(user.id, token.accessToken, lastHistoryEntry?.timestamp)

    let newItemCount = 0
    for (const historyItem of history) {
      if (typeof historyItem.track !== 'string') await this.tracksService.upsert(historyItem.track)
      await this.historyService.create(historyItem)
      newItemCount += 1
    }

    this.logger.debug(`Created ${newItemCount} new history items`)

    return {
      added: newItemCount,
    }
  }
}
