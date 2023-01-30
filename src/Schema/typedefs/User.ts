import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { BookType } from "./Book";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
});

export const LoginType = new GraphQLObjectType({
  name: "Login",
  fields: {
    name: { type: GraphQLString },
    token: { type: GraphQLString },
  },
});
