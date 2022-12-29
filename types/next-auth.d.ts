import NextAuth, {DefaultSession, DefaultUser, User} from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"


declare module "next-auth" {

    interface User {
        group: string
        accessToken: string

        & DefaultUser
    }

    interface Session {
        user: {
            id: string
            group: string
        } & DefaultSession["user"]
        accessToken: string

    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        group:string
        accessToken: string
        & DefaultUser
    }
}