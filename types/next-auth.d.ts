import NextAuth, {DefaultSession, DefaultUser, User} from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"


declare module "next-auth" {

    interface User {
        accessToken: string

        & DefaultUser
    }

    interface Session {
        user: {
            id: string
        } & DefaultSession["user"]
        accessToken: string

    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        accessToken: string
        & DefaultUser
    }
}