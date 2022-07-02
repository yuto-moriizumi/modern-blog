import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';
@Entity()
export default class Article {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title?: string;

  @Column()
  content?: string;

  @ManyToOne(() => User, (user) => user.articles, {
    eager: true,
  })
  author?: User;

  constructor(id?: number) {
    this.id = id;
  }
}
