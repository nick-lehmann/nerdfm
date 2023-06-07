import { Module } from '@nestjs/common'
import { PrismaModule } from '../../prisma/prisma.module'
import { PrismaService } from '../../prisma/prisma.service'
import { ArtistsController } from './artists.controller'
import { ArtistsService } from './artists.service'

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, PrismaService],
  imports: [PrismaModule],
})
export class ArtistsModule {}
