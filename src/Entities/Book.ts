import {BaseEntity , Column, Entity, PrimaryColumn,OneToMany, ManyToOne, OneToOne} from "typeorm"
import { Posts } from "./Post"
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

    @ManyToOne(()=> Users,(users) => users.books)
    owner: Users


} 