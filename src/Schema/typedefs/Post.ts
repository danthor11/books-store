import {
  GraphQLFloat,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { BookType } from "./Book";
import { UserType } from "./User";

export const PostType = new GraphQLObjectType({
  name: "PostType",
  fields: {
    id: { type: GraphQLID },
    description: { type: GraphQLString },
    price: { type: GraphQLFloat },
    owner: { type: UserType },
    book: { type: BookType },
  },
});
