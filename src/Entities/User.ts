import { Entity, Column, PrimaryColumn, BaseEntity } from "typeorm";

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

  @Column({nullable:true})
  book_id: String ;

  @Column({nullable:true})
  sale_id: String;
}
