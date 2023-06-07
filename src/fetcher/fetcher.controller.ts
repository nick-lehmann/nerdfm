import { Controller, Get } from '@nestjs/common'
import { FetcherService } from './fetcher.service'

@Controller('fetcher')
export class FetcherController {
  constructor(private readonly service: FetcherService) {}

  @Get()
  async start(): Promise<void> {
    await this.service.fetch()
  }
}
