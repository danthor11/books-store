import { GraphQLFloat, GraphQLID, GraphQLInputObjectType, GraphQLString } from "graphql"

export const InputPost = new GraphQLInputObjectType({
    name: "InputPost",
    fields:{
        description: {type:GraphQLString},
        price: {type:GraphQLFloat},
        book: {type:GraphQLID}
    }
})

export const InputUpdatePost = new GraphQLInputObjectType({
    name: "InputUpdatePost",
    fields:{
        description: {type:GraphQLString},
        price: {type:GraphQLFloat},
    }
})