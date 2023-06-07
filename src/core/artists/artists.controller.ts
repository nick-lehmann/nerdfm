import { Body, Controller, Get, HttpException, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../user/auth/jwt.guard'
import { ArtistModel, CreateArtistModel } from './artist.model'
import { ArtistsService } from './artists.service'

@Controller('artists')
export class ArtistsController {
  constructor(private readonly service: ArtistsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async list(): Promise<ArtistModel[]> {
    return []
    // return this.service.list()
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() artist: CreateArtistModel): Promise<ArtistModel> {
    // return this.service.create(artist)
    throw new HttpException('Artist already exists', 409)
  }
}
