import { GraphQLString } from "graphql";
import { Users } from "../../Entities/User";
import { UserType } from "../typedefs/User";

export const GET_ALL_USER = {
  type: GraphQLString,
  resolve: async () => {
    return await Users.find();
  },
};

export const GET_USER_BY_ID = {
  type: UserType ,
  args: {
    id: { type: GraphQLString },
  },
  resolve: async (_: any, args: any) => {
    const user = await Users.createQueryBuilder("user")
    .leftJoinAndSelect("user.books","books")
    .leftJoinAndSelect("user.post","posts")
    .where("user.id = :id",{id:args.id})
    .getOne()

    return user
  },
};
