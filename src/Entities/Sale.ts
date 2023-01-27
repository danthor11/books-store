import { BaseEntity, Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { Books } from "./Book";
import { Users } from "./User";

@Entity()
export class Sales extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  price: number;

  
}
