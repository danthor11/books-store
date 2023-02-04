import express, { Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import { schemaConfig } from "./Schema";
import "./db"
import { upload } from "./libs/storage";

const app = express();

app.post("/images",upload.single("images"), (req:Request, res : Response) => {
    res.json({image:"listo"})
})

app.use("/graphql", upload.single("images") ,  graphqlHTTP({
    schema:schemaConfig,
    graphiql:true,    
}))

app.get("/",(req:Request,res :Response) => {
    res.redirect("/graphql")
})



app.listen(4000,()=>{
    console.log("Server running on port 4000")
})
