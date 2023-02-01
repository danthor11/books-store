import { GraphQLString } from "graphql";
import { Users } from "../../Entities/User";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ResponseType } from "../typedefs/Response";

export const CREATE_USER = {
  type: ResponseType,
  args: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_: unknown, args: any) {
    try {
      const userToSave = new Users();

      userToSave.id = uuidv4();
      userToSave.name = args.name;
      userToSave.email = args.email;
      userToSave.password = await bcrypt.hash(args.password, 10);

      const result = await userToSave.save();

      if (result)
        return {
          success: true,
          message: "USER CREATED SUCCESSFULLY!",
        };
    } catch (error) {
      return {
        success: true,
        message: error,
      };
    }
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

    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        id: user.id,
      },
      "DANIELO",
      { expiresIn: "1h" }
    );

    return token;
  },
};
