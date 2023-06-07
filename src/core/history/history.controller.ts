import { Controller, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../user/auth/jwt.guard'
import { HistoryService } from './history.service'

@Controller('history')
export class HistoryController {
  constructor(private readonly service: HistoryService) {}

  // TODO: Pass user id from JWT
  @UseGuards(JwtAuthGuard)
  async list() {
    return this.service.list(1)
  }
}
