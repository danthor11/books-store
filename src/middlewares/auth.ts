import jwt from "jsonwebtoken"

type UserAuth = {
    name: string
    email: string
    id: string
    iat:number
    exp: number
}

export const isAuth = (auth: string) : UserAuth|string => {
    if(!auth)
        return "NOT_AUTH"
    const token = auth?.substring(7,auth?.length)
   
    try {
        const decoded = jwt.verify(token as string,"DANIELO")
        return decoded as UserAuth
    } catch (error) {
        return "INVALID_TOKEN"
    }
}