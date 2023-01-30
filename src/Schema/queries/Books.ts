import { GraphQLBoolean, GraphQLID, GraphQLList } from "graphql";
import { AppDataSource } from "../../db";
import { Books } from "../../Entities/Book";
import { Users } from "../../Entities/User";
import { isAuth } from "../../middlewares/auth";
import { BookType } from "../typedefs/Book";

export const GET_BOOKS_BY_USER_ID = {
  type: new GraphQLList(BookType),
  resolve: async (_: any, __: any, context: any) => {
    const auth = context.headers?.authorization;
    if (!auth) return undefined;
    const userInfo = isAuth(auth);

    if (typeof userInfo === "string") return undefined;

    const books = await Books.createQueryBuilder("books")
      .leftJoinAndSelect("books.owner", "users")
      .where("books.ownerId = :user", { user: userInfo.id })
      .getMany();

    return books;
  },
};

export const GET_BOOK_ID = {
  type: BookType,
  args: {
    id: { type: GraphQLID },
  },
  resolve: async (_: any, { id }: any, context: any) => {
    const auth = context.headers?.authorization;
    if (!auth) return undefined;
    const userInfo = isAuth(auth);

    if (typeof userInfo === "string") return undefined;

    const books = await Books.createQueryBuilder("books")
      .leftJoinAndSelect("books.owner", "users")
      .where("books.id = :id", { id })
      .getOne();

    return books;
  },
};
