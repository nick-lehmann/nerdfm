import { Injectable } from '@nestjs/common'

@Injectable()
export class GenresService {
  list() {
    return 'here are all the genres'
  }
}
