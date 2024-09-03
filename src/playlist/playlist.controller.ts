import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { Playlist } from './playlist.entity';
import { Video } from '../video/video.entity';

@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get()
  findAll(): Promise<Playlist[]> {
    return this.playlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Playlist> {
    return this.playlistService.findOne(id);
  }

  @Post()
  create(
    @Body()
    createPlaylistDto: {
      title: string;
      userId: number;
      videos: { name: string; url: string }[];
    },
  ): Promise<Playlist> {
    const videos = createPlaylistDto.videos.map((video) => {
      const vid = new Video();
      vid.name = video.name;
      vid.url = video.url;
      return vid;
    });
    return this.playlistService.create({ ...createPlaylistDto, videos });
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.playlistService.remove(id);
  }
}
