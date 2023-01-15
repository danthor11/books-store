import {GraphQLObjectType , GraphQLSchema} from "graphql"
import { CREATE_USER } from "./mutations/Users"
import { GET_ALL_USER } from "./queries/getAllUsers"


const rootQueries = new GraphQLObjectType({
    name:"RootQueries",
    fields:{
        "getAllUser":GET_ALL_USER
    }
})

const mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        "createUser": CREATE_USER
    }
})



export const schemaConfig = new GraphQLSchema({
    query: rootQueries,
    mutation
})
