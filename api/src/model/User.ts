import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import ArticleModel from './Article';

@Entity()
export default class UserModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => ArticleModel, (article) => article.author)
  articles!: ArticleModel[];

  constructor(id?: number) {
    if (id) this.id = id;
  }
}
