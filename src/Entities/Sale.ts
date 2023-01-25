import { BaseEntity, Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { Books } from "./Book";
import { Users } from "./User";

@Entity()
export class Sales extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  price: number;

  @OneToOne(() => Books, (book) => book.id)
  book_id: Books;

  @OneToOne(() => Users, (user) => user.id)
  seller_id: Users;

  @OneToOne(() => Users, (user) => user.id, { nullable: true })
  buyer_id: Users;
}
