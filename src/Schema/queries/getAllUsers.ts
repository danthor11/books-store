import { GraphQLString } from "graphql";
import { Users } from "../../Entities/User";
import { UserType } from "../typedefs/User";

export const GET_ALL_USER = {
  type: GraphQLString,
  resolve: async () => {
    const users = await Users.find();

    return "hello world";
  },
};

export const GET_USER_BY_ID = {
  type: UserType,
  args: {
    id: { type: GraphQLString },
  },
  resolve: async (_: any, args: any) => {
    const user = await Users.findOneBy({ id: args.id });

    return user;
  },
};
