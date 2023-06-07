import { Controller } from '@nestjs/common'
import { GenresService } from './genres.service'

@Controller('genres')
export class GenresController {
  constructor(private readonly service: GenresService) {}

  async list() {
    return this.service.list()
  }
}
