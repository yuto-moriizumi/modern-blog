import { Column, Entity, PrimaryColumn } from 'typeorm';
import User from './User';
@Entity()
export default class Article {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title?: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.articles)
  user: User
}
