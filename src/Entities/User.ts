import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany } from "typeorm";
import { Books } from "./Book";
import { Posts } from "./Post";

@Entity()
export class Users  extends BaseEntity{
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(()=>Books,(book) => book.owner)
  books: Books[];

  @OneToMany(() => Posts, (post) => post.owner)
  post: Posts[];
}
