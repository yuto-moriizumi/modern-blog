import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import UserModel from './User';
@Entity()
export default class ArticleModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @ManyToOne(() => UserModel, (user) => user.articles, {
    eager: true,
  })
  author!: UserModel;

  constructor(id?: number) {
    if (id) this.id = id;
  }
}
