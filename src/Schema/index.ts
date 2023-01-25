import {GraphQLObjectType , GraphQLSchema} from "graphql"
import { CREATE_USER, LOG_IN_USER } from "./mutations/Users"
import { GET_ALL_USER, GET_USER_BY_ID } from "./queries/getAllUsers"


const rootQueries = new GraphQLObjectType({
    name:"RootQueries",
    fields:{
        "getAllUser":GET_ALL_USER,
        "getUserById": GET_USER_BY_ID,
        
    }
})

const mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        "createUser": CREATE_USER,
        "loginUser": LOG_IN_USER
    }
})



export const schemaConfig = new GraphQLSchema({
    query: rootQueries,
    mutation
})
