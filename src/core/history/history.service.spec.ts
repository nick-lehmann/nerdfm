import { PrismaModule } from '@db/prisma.module'
import { Test, TestingModule } from '@nestjs/testing'
import { History } from './history.model'
import { HistoryService } from './history.service'

describe('AppController', () => {
  let svc: HistoryService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [HistoryService],
    }).compile()

    svc = app.get<HistoryService>(HistoryService)
  })

  describe('creation', async () => {
    it.skip('should create tracks that were not already present', async () => {
      const history: History = {
        userId: 0,
        track: '',
        playedAt: new Date(2020, 1, 1, 0, 0, 0),
      }
      // await svc.createMany([])
    })
  })
})
