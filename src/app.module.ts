import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './playlist/playlist.entity';
import { User } from './user/user.entity';
import { UsersModule } from './user/user.module';
import { PlaylistsModule } from './playlist/playlist.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'admin',
      database: 'video_service',
      entities: [User, Playlist],
      synchronize: true,
    }),
    UsersModule,
    PlaylistsModule,
  ],
})
export class AppModule {}
