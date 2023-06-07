import { PrismaService } from '@db/prisma.service'
import { Injectable } from '@nestjs/common'
import { TrackHistory } from '@prisma/client'
import { UserID } from '../user/user.model'
import { History } from './history.model'

@Injectable()
export class HistoryService {
  constructor(private readonly db: PrismaService) {}

  async list(userId: UserID): Promise<TrackHistory[]> {
    return this.db.trackHistory.findMany({ where: { userId } })
  }

  async last(useId: UserID): Promise<TrackHistory | null> {
    return this.db.trackHistory.findFirst({ where: { userId: useId }, orderBy: { timestamp: 'desc' } })
  }

  async create(trackHistory: History): Promise<TrackHistory> {
    return this.db.trackHistory.create({ data: this.toStorage(trackHistory) })
  }

  toStorage(history: History): TrackHistory {
    return {
      userId: history.userId,
      trackId: typeof history.track === 'string' ? history.track : history.track.id,
      timestamp: history.playedAt,
    }
  }
}
