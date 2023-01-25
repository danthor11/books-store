import {BaseEntity , Column, Entity, PrimaryColumn,OneToMany, ManyToOne} from "typeorm"
import { Users } from "./User"

@Entity()
export class Books extends BaseEntity{
    @PrimaryColumn()
    id: string

    @Column()
    title: string

    @Column()
    author: string

    @Column()
    year: number

    @ManyToOne(()=> Users,(users) => users.id)
    owner_id: Users

}