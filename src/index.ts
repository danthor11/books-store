import express, { Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import { schemaConfig } from "./Schema";
import "./db"

const app = express();

app.use("/graphql", graphqlHTTP({
    schema:schemaConfig,
    graphiql:true,    
}))

app.get("/",(req:Request,res :Response) => {
    res.redirect("/graphql")
})


app.listen(4000,()=>{
    console.log("Server running on port 4000")
})
