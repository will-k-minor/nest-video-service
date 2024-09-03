import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from './playlist.entity';
import { Video } from '../video/video.entity';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private playlistsRepository: Repository<Playlist>,
    @InjectRepository(Video)
    private videosRepository: Repository<Video>,
  ) {}

  findAll(): Promise<Playlist[]> {
    return this.playlistsRepository.find({ relations: ['videos', 'user'] });
  }

  findOne(id: number): Promise<Playlist> {
    return this.playlistsRepository.findOne({
      where: { id },
      relations: ['videos', 'user'],
    });
  }

  async create(playlistData: {
    title: string;
    userId: number;
    videos: Video[];
  }): Promise<Playlist> {
    const playlist = this.playlistsRepository.create({
      title: playlistData.title,
      user: { id: playlistData.userId }, // Assuming userId is provided in the request body
      videos: playlistData.videos,
    });
    return this.playlistsRepository.save(playlist);
  }

  async remove(id: number): Promise<void> {
    await this.playlistsRepository.delete(id);
  }
}
