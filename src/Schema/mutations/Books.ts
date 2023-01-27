import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
} from "graphql";
import jwt from "jsonwebtoken";
import { Books } from "../../Entities/Book";
import { Users } from "../../Entities/User";
import { v4 as uuidv4 } from "uuid";
import { isAuth } from "../../middlewares/auth";
import { userInfo } from "os";

type TokenPayload = {
  name: string;
  email: string;
  id: string;
  iat: number;
  exp: number;
};

const BookInput = new GraphQLInputObjectType({
    name: "BookInput",
    fields: {
      title: { type: GraphQLString },
      author: { type: GraphQLString },
      year: { type: GraphQLString },
    }
  })

export const ADD_NEW_BOOK = {
  type: GraphQLBoolean,
  args: {
    input: {type: BookInput},
    token: { type: GraphQLString },
  },
  resolve: async (_: unknown, args: any, context: any) => {
    const token = context.headers.authorization;

    const userAuth = isAuth(token);

    try {
      if (typeof userAuth === "string") throw Error("NOT TOKEN");

      const user = await Users.findOneBy({ id: userAuth.id });

      if (!user) throw Error("INVALID_USER");

      const book = new Books();

      book.id = uuidv4();
      book.title = args.title;
      book.author = args.author;
      book.year = args.year;
      book.owner = user;

      await book.save();

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

export const DELETE_BOOK = {
  type: GraphQLBoolean,
  args: {
    token: { type: GraphQLString },
    bookToDeleteId: { type: GraphQLID },
  },
  async resolve(_: any, { bookToDeleteId, token }: any, context: any) {
    try {
      const _token = context.headers.authorization;
      const userAuth = isAuth(_token);
      if (typeof userAuth === "string") throw Error("This Action is invalid");

      const { affected } = await Books.delete(bookToDeleteId);

      return affected === 1;
    } catch (error) {
      console.log(error);
    }

    return false;
  },
};

export const UPDATE_BOOK = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLID },
    token: { type: GraphQLString },
    input: {
      type: BookInput
    },
  },
  async resolve(_: any, { id, input }: any, context: any) {
    const auth = context.headers.authorization
    const user = isAuth(auth)
    
    if(typeof user === "string")
        return false

    try {
        const bookToUpdate = await Books.findOneBy({id})

        if(!bookToUpdate)
            throw Error("Book doesn't exist")


        bookToUpdate.title = input.title
        bookToUpdate.author = input.author
        bookToUpdate.year = input.year

        const res = await bookToUpdate.save()
        console.log(res)
    } catch (error) {
        return false
    }

    return true
  },
};


