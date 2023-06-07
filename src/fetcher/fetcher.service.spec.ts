import { Test, TestingModule } from '@nestjs/testing'
import { History, User, UserService } from '../core'
import { FetcherService } from './fetcher.service'

describe('Fetcher Service', () => {
  let svc: FetcherService
  let userService: UserService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [FetcherService, UserService],
    }).compile()

    svc = app.get<FetcherService>(FetcherService)
    userService = app.get<UserService>(UserService)
  })

  it('works', async () => {
    const sampleUser: User = {
      id: 0,
      name: 'test user',
    }

    const startTime = new Date(2020, 1, 1, 0, 0, 0)
    const historyEntries: History[] = []
    for (let i = 0; i < 10; i++)
      historyEntries.push({
        userId: sampleUser.id,
        track: `track${i}`,
        playedAt: new Date(startTime.getTime() + i * 1000),
      })

    jest.spyOn(userService, 'get').mockImplementation(async () => sampleUser)

    await svc.fetchForUser(sampleUser)
  })
})
