import { GraphQLArgs, GraphQLBoolean, GraphQLFloat, GraphQLID, GraphQLInputObjectType, GraphQLString } from "graphql"
import { Books } from "../../Entities/Book";
import { Posts } from "../../Entities/Post";
import { Users } from "../../Entities/User";
import { isAuth } from "../../middlewares/auth";
import {v4 as uuidv4} from "uuid"

const InputPost = new GraphQLInputObjectType({
    name: "InputPost",
    fields:{
        description: {type:GraphQLString},
        price: {type:GraphQLFloat},
        book: {type:GraphQLID}
    }
})

const InputUpdatePost = new GraphQLInputObjectType({
    name: "InputUpdatePost",
    fields:{
        description: {type:GraphQLString},
        price: {type:GraphQLFloat},
    }
})

export const ADD_NEW_POST = {
    type: GraphQLBoolean,
    args: {
        input: { type: InputPost}
    },
    async resolve (_:any , {input}:any , context: any) {
        
        const token = context.headers.authorization;

        const userAuth = isAuth(token);
        console.log(userAuth)
        try {
            if (typeof userAuth === "string") throw Error("NOT TOKEN");
            
            const user = await Users.findOneBy({ id: userAuth.id });
            
            if (!user) throw Error("INVALID_USER");

            
            const book = await Books.createQueryBuilder("books")
                .leftJoinAndSelect("books.owner","users")
                .where("books.id = :id",{id:input.book})
                .getOne()
            
                
                
            if(!book) throw Error("BOOK_DOESNT_EXIST")
            if(!book.owner.id.includes(userAuth.id)) throw Error("YOU CANT POST A BOOK THAT DOESNT BELONG TO YOU")
        
            const newPost = {
                id: uuidv4(),
                description:input.description,
                price:input.price,
                owner:user,
                book
            }

            const res = await Posts.insert(newPost)

            console.log(res)

            return true
        }
        catch(error){
            console.log(error) 
            return false
        }
    }
}


export const DELETE_POST = {
    type: GraphQLBoolean,
    args:{
        id:{type:GraphQLID}
    },
    async resolve(_:any , {id}:any, context:any){
        const token = context.headers.authorization;

        try {
            const userAuth = isAuth(token);
            if (typeof userAuth === "string") throw Error("NOT TOKEN");
            
            const user = await Users.findOneBy({ id: userAuth.id });
            
            if (!user) throw Error("INVALID_USER");

            const book = await Posts.createQueryBuilder("post")
                .leftJoinAndSelect("post.owner","users")
                .where("post.id = :id",{id})
                .getOne()
            
            if(!book) throw Error("POST_DOESNT_EXIST")
            if(!book.owner.id.includes(userAuth.id)) throw Error("YOU CANT DELETE A POST THAT DOESNT BELONG TO YOU")

            console.log(await book.remove())

            return true
        }
        catch(error){
            console.log(error)
            return false
        }
    }
}


export const UPDATE_POST = {
    type: GraphQLBoolean,
    args:{
        input: {type: InputUpdatePost},
        id:{type:GraphQLID}
    },
    async resolve(_:any , {id,input}:any, context:any){
        const token = context.headers.authorization;

        try {
            const userAuth = isAuth(token);
            if (typeof userAuth === "string") throw Error("NOT TOKEN");
            
            const user = await Users.findOneBy({ id: userAuth.id });
            
            if (!user) throw Error("INVALID_USER");

            const book = await Posts.createQueryBuilder("post")
                .leftJoinAndSelect("post.owner","users")
                .where("post.id = :id",{id})
                .getOne()
            
            if(!book) throw Error("POST_DOESNT_EXIST")
            if(!book.owner.id.includes(userAuth.id)) throw Error("YOU CANT UPDATE A POST THAT DOESNT BELONG TO YOU")
            
            
            book.description=input.description
            book.price = input.price

            const res = await book.save()
            

            return true
        }
        catch(error){
            console.log(error)
            return false
        }
    }
}