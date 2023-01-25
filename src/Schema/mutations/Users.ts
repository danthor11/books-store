import { GraphQLString, GraphQLBoolean } from "graphql";
import { Users } from "../../Entities/User";
import { UserType } from "../typedefs/User";
import { v4 as uuidv4 } from "uuid";

import bcrypt from "bcrypt";

export const CREATE_USER = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_: unknown, args: any) {
    const userToSave = new Users();

    userToSave.id = uuidv4();
    userToSave.name = args.name;
    userToSave.email = args.email;
    userToSave.password = await bcrypt.hash(args.password, 10);

    const result = await userToSave.save();

    console.log(result);
    if (result) return result;

    return null;
  },
};

export const LOG_IN_USER = {
  type: GraphQLString,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (_any: any, args: any) => {
    if (typeof args.email !== "string" || typeof args.password !== "string")
      return "";

    const user = await Users.findOneBy({ email: args.email });

    if (!user) return "";

    const passwordHash = await bcrypt.compare(
      args.password,
      user.password.toString()
    );

    if (!passwordHash) return "";

    return user.password;
  },
};
