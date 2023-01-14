import NextAuth, {User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {fetchData} from "../../../utils/FetchUnit";
import {NextApiRequest, NextApiResponse} from "next";
import {getIP} from "../../../utils/ClientsideUtil";


export default async function auth(req: NextApiRequest, res: NextApiResponse) {


    return await NextAuth(req, res, {
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
                authorize: async (credentials): Promise<User | null> => {
                    if (!credentials) {
                        return null
                    }

                    //  login request
                    const loginRes = await fetchData(
                        "login",
                        "POST",
                        {
                            'username': credentials.username,
                            'password': credentials.password,
                            '2fa_token': credentials.two_fa_token,
                        },
                        undefined,
                        getIP(req) ?? undefined
                    )

                    //  debug
                    console.log("id: ", credentials.username, " result: ",loginRes)

                    if (!loginRes || loginRes.response_status != 200) {
                        return null
                    }


                    //  get own profile
                    const profile = await fetchData(
                        "me",
                        "GET",
                        {},
                        loginRes.state,
                        getIP(req) ?? undefined
                    )
                    if (!profile || profile.response_status != 200) {
                        return null
                    }

                    return {
                        id: profile.id,
                        name: profile.username,
                        group: profile.group,
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
                session.user.group = token.group
                session.accessToken = token.accessToken

                return session
            },
            //  @ts-ignore
            async jwt({token, user}) {
                if (user) {
                    token.id = user.id
                    token.name = user.name
                    token.group = user.group
                    token.accessToken = user.accessToken
                }

                return token
            }
        },
        session: {
            strategy: "jwt",
            maxAge: 7 * 24 * 60 * 60,
            updateAge: 24 * 60 * 60,
        },
        secret: process.env.SECRET,
        pages: {
            signIn: "/auth/signin"
        }
    })
}