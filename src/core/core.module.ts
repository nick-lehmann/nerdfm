import { Module } from '@nestjs/common'
import { AlbumsModule } from './albums/albums.module'
import { GenresModule } from './genres/genres.module'
import { HistoryModule } from './history/history.module'
import { TracksModule } from './tracks/tracks.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [AlbumsModule, GenresModule, HistoryModule, TracksModule, UserModule],
  exports: [AlbumsModule, GenresModule, HistoryModule, TracksModule, UserModule],
})
export class CoreModule {}
