import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany } from "typeorm";
import { Books } from "./Book";

@Entity()
export class Users  extends BaseEntity{
  @PrimaryColumn()
  id: String;

  @Column()
  name: String;

  @Column()
  email: String;

  @Column()
  password: String;

  @OneToMany(()=>Books,(book) => book.id)
  book_id: Books[];

  @Column({nullable:true})
  sale_id: String;
}
