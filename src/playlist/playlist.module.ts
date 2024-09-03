import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { Video } from '../video/video.entity';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Video])],
  providers: [PlaylistService],
  controllers: [PlaylistController],
})
export class PlaylistsModule {}
