import { GraphQLList } from "graphql";
import { Posts } from "../../Entities/Post";
import { Users } from "../../Entities/User";
import { isAuth } from "../../middlewares/auth";
import { PostType } from "../typedefs/Post";

export const GET_POSTS_BY_USER = {
  type: new GraphQLList(PostType),
  async resolve(_: any, args: any, context: any) {
    const token = context.headers.authorization;

    const userAuth = isAuth(token);

    try {
      if (typeof userAuth === "string") throw Error("NOT TOKEN");

      const user = await Users.findOneBy({ id: userAuth.id });

      if (user) throw Error("NOT AUTORIZED");

      const posts = await Posts.createQueryBuilder("posts")
        .leftJoinAndSelect("posts.book", "books")
        .leftJoinAndSelect("posts.owner", "users")
        .where("posts.ownerId = :id", { id: userAuth.id })
        .getMany();

      return posts;
    } catch (error) {
      console.log(error);
    }
  },
};

export const GET_ALL_POST = {
  type: new GraphQLList(PostType),
  async resolve() {
    const post = await Posts.createQueryBuilder("posts")
      .leftJoinAndSelect("posts.book", "books")
      .leftJoinAndSelect("posts.owner", "users")
      .getMany();

    return post;
  },
};
