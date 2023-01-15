import { DataSource } from "typeorm";
import { Users } from "./Entities/User";
import "reflect-metadata"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  database: "book_store",
  port: 3306,
  synchronize: true,
  entities: [Users],
})


AppDataSource.initialize().then(DataSource => {
    console.log("Connected to the database!")
})
.catch(error => {
    console.log(error)
})
