import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Books } from "./Book";
import { Users } from "./User";

@Entity()
export class Sales extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column("date")
  fecha: Date

  @OneToOne(() =>Users)
  @JoinColumn()
  customer: Users

  @OneToOne(() => Books)
  @JoinColumn()
  book:Books
  

}
