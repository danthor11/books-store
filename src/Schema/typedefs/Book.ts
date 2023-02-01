import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType
} from "graphql";
import { UserType } from "./User";

export const BookType = new GraphQLObjectType({
  name: "Book",
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    owner: { type: UserType },
    year: { type: GraphQLInt },
  },
});

export const BookInput = new GraphQLInputObjectType({
  name: "BookInput",
  fields: {
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    year: { type: GraphQLInt },
  },
});
