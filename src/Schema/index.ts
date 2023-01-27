import {GraphQLObjectType , GraphQLSchema} from "graphql"
import { ADD_NEW_BOOK, DELETE_BOOK, UPDATE_BOOK } from "./mutations/Books"
import { CREATE_USER, LOG_IN_USER } from "./mutations/Users"
import { GET_BOOKS_BY_USER_ID } from "./queries/Books"
import { GET_ALL_USER, GET_USER_BY_ID } from "./queries/getAllUsers"


const rootQueries = new GraphQLObjectType({
    name:"RootQueries",
    fields:{
        "getAllUser":GET_ALL_USER,
        "getUserById": GET_USER_BY_ID,
        "getBooksByUser":GET_BOOKS_BY_USER_ID
    }
})

const mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        "createUser": CREATE_USER,
        "loginUser": LOG_IN_USER,
        "addNewBook": ADD_NEW_BOOK,
        "deleteBook":DELETE_BOOK,
        "updateBook": UPDATE_BOOK,
       
    }
})



export const schemaConfig = new GraphQLSchema({
    query: rootQueries,
    mutation
})
