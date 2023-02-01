import { GraphQLID, GraphQLString } from "graphql";
import { Books , Users} from "../../Entities";
import { v4 as uuidv4 } from "uuid";
import { isAuth } from "../../middlewares/auth";
import { BookInput } from "../typedefs/Book";
import { ResponseType } from "../typedefs/Response";

export const ADD_NEW_BOOK = {
  type: ResponseType,
  args: {
    input: { type: BookInput },
  },
  resolve: async (_: unknown, { input }: any, context: any) => {
    const token = context.headers.authorization;
    const userAuth = isAuth(token);

    try {
      if (typeof userAuth === "string") throw Error("NOT TOKEN");

      const user = await Users.findOneBy({ id: userAuth.id });

      if (!user) throw Error("INVALID_USER");

      const book = new Books();

      book.id = uuidv4();
      book.title = input.title;
      book.author = input.author;
      book.year = input.year;
      book.owner = user;

      await book.save();

      return {
        success: true,
        message: "THE BOOK HAS BEEN ADDED SUCCESSFULLY!",
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  },
};

export const DELETE_BOOK = {
  type: ResponseType,
  args: {
    bookToDeleteId: { type: GraphQLID },
  },
  async resolve(_: any, { bookToDeleteId }: any, context: any) {
    try {
      const _token = context.headers.authorization;
      const userAuth = isAuth(_token);
      if (typeof userAuth === "string") throw Error("This Action is invalid");

      const { affected } = await Books.delete(bookToDeleteId);

      if (affected !== 1) throw Error("ERROR IN THE DELETE ACTION");

      return {
        success: true,
        message: "THE BOOK HAS BEEN DELETE SUCCESSFULLY!",
      };
    } catch (error) {
      return {
        success: true,
        message: error,
      };
    }
  },
};

export const UPDATE_BOOK = {
  type: ResponseType,
  args: {
    id: { type: GraphQLID },
    token: { type: GraphQLString },
    input: {
      type: BookInput,
    },
  },
  async resolve(_: any, { id, input }: any, context: any) {
    const auth = context.headers.authorization;
    const user = isAuth(auth);

    if (typeof user === "string") return false;

    try {
      const bookToUpdate = await Books.findOneBy({ id });

      if (!bookToUpdate) throw Error("Book doesn't exist");

      bookToUpdate.title = input.title;
      bookToUpdate.author = input.author;
      bookToUpdate.year = input.year;

      await bookToUpdate.save();

      return {
        success:false,
        message: "THE BOOK INFORMATION HAS BEEN UPDATED!"
      };
    } catch (error) {
      return {
        success: true,
        message: "THE BOOK HAS BEEN DELETE SUCCESSFULLY!",
      };
    }

    return true;
  },
};
