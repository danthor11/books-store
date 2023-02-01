import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from "graphql"


export const ResponseType = new GraphQLObjectType({
    name:"Response",
    fields:{
        success: {type:GraphQLBoolean},
        message: {type:GraphQLString}
    }
})