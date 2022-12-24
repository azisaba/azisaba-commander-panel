import NextAuth, {User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {fetchData} from "../../../utils/FetchUnit";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text"
                },
                password: {
                    label: "Password",
                    type: "password"
                },
                two_fa_token: {
                    label: "2FA token",
                    type: "text"
                }
            },
            authorize: async (credentials):  Promise<User | null> => {
                if (!credentials){
                    return null
                }

                //  login request
                const loginRes = await fetchData(
                    "login",
                    "POST",
                    {
                        username: credentials.username,
                        password: credentials.password,
                        two_fa_token: credentials.two_fa_token
                    }
                )
                if (!loginRes || loginRes.response_status != 200) {
                    return null
                }

                //  get own profile
                const profile = await fetchData(
                    "me",
                    "GET",
                    {},
                    loginRes.state
                )
                if (!profile || profile.response_status != 200)
                {
                    return null
                }

                return {
                    id: profile.id,
                    name: profile.username,
                    accessToken: loginRes.state
                }
            }
        })
    ],
    callbacks: {
        //  @ts-ignore
        async session({session, token}) {
            session.user.id = token.id
            session.user.name = token.name
            session.accessToken = token.accessToken

            return session
        },
        //  @ts-ignore
        async jwt({token, user}) {
            if(user) {
                token.id = user.id
                token.name = user.name
                token.accessToken = user.accessToken
            }

            return token
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    secret: process.env.SECRET,
    pages: {
        signIn: "/auth/signin"
    }
})