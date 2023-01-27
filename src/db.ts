import { DataSource } from "typeorm";
import { Users } from "./Entities/User";
import "reflect-metadata"
import { Books } from "./Entities/Book";
import { Sales } from "./Entities/Sale";
import { Posts } from "./Entities/Post";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  database: "book_store",
  port: 3306,
  synchronize: true,
  entities: [
    Users,
    Books,
    Sales,
    Posts
  ],
}) 


AppDataSource.initialize().then(DataSource => {
    console.log("Connected to the database!")
}) 
.catch(error => {
    console.log(error)
}) 
 