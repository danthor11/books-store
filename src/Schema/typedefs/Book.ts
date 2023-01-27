import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

export const BookType = new GraphQLObjectType({
    name: "Book",
    fields: {
      id: { type: GraphQLString},
      title: { type: GraphQLString },
      author: { type: GraphQLString },
      ownerId: { type: GraphQLID },
      year: { type: GraphQLInt },
    },
  });