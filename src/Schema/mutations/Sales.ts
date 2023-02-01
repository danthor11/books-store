import { GraphQLString } from "graphql";
import { Books , Posts ,Sales ,Users} from "../../Entities";
import { isAuth } from "../../middlewares/auth";
import { v4 as uuidV4 } from "uuid";
import { ResponseType } from "../typedefs/Response";

export const BUY_A_BOOK = {
  type: ResponseType,
  args: {
    book_id: { type: GraphQLString },
  },
  async resolve(_: any, { book_id }: any, context: any) {
    const user_auth = isAuth(context.headers.authorization);

    try {
      if (typeof user_auth === "string") throw Error("TOKEN NOT FOUND");

      const userExists = await Users.findOneBy({ id: user_auth.id });
      const bookExists = await Books.findOneBy({ id: book_id });

      if (!bookExists) throw Error("BOOK DOESN'T EXIST");
      if (!userExists) throw Error("BOOK DOESN'T EXIST");

      const post = await Posts.createQueryBuilder("post")
        .where("post.bookId = :id", { id: bookExists.id })
        .getOne();

      if (!post) throw Error("BOOK DOESN'T EXIST");

      const newSale = new Sales();

      newSale.id = uuidV4();
      newSale.fecha = new Date();
      newSale.customer = userExists;
      newSale.book = bookExists;

      await Sales.insert(newSale);

      post.available = false;
      await post.save();

      return {
        success: true,
        message: "THE POST HAS BEEN CREATED!",
      };
    } catch (error) {
      return {
        success: true,
        message: error,
      };
    }
  },
};
