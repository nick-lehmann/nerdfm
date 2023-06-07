import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { CreateTrack } from './track.model'
import { TracksService } from './tracks.service'

@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrack) {
    return this.tracksService.upsert(createTrackDto)
  }

  @Get()
  list() {
    // return this.tracksService.findAll()
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.tracksService.get(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: Partial<CreateTrack>) {
    return this.tracksService.update(id, updateTrackDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tracksService.remove(id)
  }
}
