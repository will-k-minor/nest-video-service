import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Playlist } from '../playlist/playlist.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists: Playlist[];
}
