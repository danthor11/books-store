import { BaseEntity, Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { Books } from "./Book";
import { Users } from "./User";

@Entity()
export class Posts extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @Column()
  price: number;
  
  @OneToOne(() => Books, (book) => book.id)
  book_id: Books;

  
  @OneToOne(() => Users, (user) => user.id, { nullable: true })
  owner_id: Users;

}
