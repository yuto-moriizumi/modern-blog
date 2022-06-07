import dayjs from 'dayjs';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Article from './Article';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name?: string;

  @OneToMany(() => Article, (article) => article.author)
  articles?: Article[];

  constructor(id: number) {
    this.id = id;
  }
}
