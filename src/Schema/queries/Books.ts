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
      .where("books.ownerId = :user", { user: userInfo.id })
      .getMany();
      console.log(books)
      return books;
  },
}

export const GET_BOOK_ID = {};
