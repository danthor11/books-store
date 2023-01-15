import {GraphQLObjectType ,GraphQLString} from "graphql"

export const UserType = new GraphQLObjectType({
    name:"User",
    fields:{
        id:{ type: GraphQLString},
        name :{ type: GraphQLString},
        email :{ type: GraphQLString},
        password :{ type: GraphQLString },
        book_id :{ type: GraphQLString},
        sale_id :{ type: GraphQLString},
    }
})
