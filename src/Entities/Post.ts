import { BaseEntity, Column, Entity, OneToOne, PrimaryColumn , ManyToOne, JoinColumn} from "typeorm";
import { Books } from "./Book";
import { Users } from "./User";

@Entity()
export class Posts extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @Column("float")
  price: number;
  
  @OneToOne(() => Books)
  @JoinColumn()
  book: Books;

  
  @ManyToOne(() => Users, (user) => user.post)
  owner: Users;

}
