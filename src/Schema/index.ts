import {GraphQLObjectType , GraphQLSchema} from "graphql"
import { ADD_NEW_BOOK, DELETE_BOOK, UPDATE_BOOK } from "./mutations/Books"
import { ADD_NEW_POST, DELETE_POST, UPDATE_POST } from "./mutations/Posts"
import { BUY_A_BOOK } from "./mutations/Sales"
import { CREATE_USER, LOG_IN_USER } from "./mutations/Users"
import { GET_BOOKS_BY_USER_ID, GET_BOOK_ID } from "./queries/Books"
import { GET_ALL_USER, GET_USER_BY_ID } from "./queries/getAllUsers"
import { GET_ALL_POST, GET_POSTS_BY_USER } from "./queries/Posts"


const rootQueries = new GraphQLObjectType({
    name:"RootQueries",
    fields:{
        "getAllUser":GET_ALL_USER,
        "getUserById": GET_USER_BY_ID,

        "getBooksByUser":GET_BOOKS_BY_USER_ID,
        "getBookById": GET_BOOK_ID,

        "getAllPost": GET_ALL_POST,
        "getPostByUser":GET_POSTS_BY_USER
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

        "addNewPost":ADD_NEW_POST,
        "updateAPost": UPDATE_POST,
        "deletePostById": DELETE_POST,

        "buyBook":BUY_A_BOOK
    }
})



export const schemaConfig = new GraphQLSchema({
    query: rootQueries,
    mutation
})
