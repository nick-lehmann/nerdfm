import { PrismaModule } from '@db/prisma.module'
import { Module } from '@nestjs/common'
import { TracksController } from './tracks.controller'
import { TracksService } from './tracks.service'

@Module({
  imports: [PrismaModule],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
