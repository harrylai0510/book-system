import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions = {
    secret: 'aaaa',
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user?.id;
                token.userToken = user?.userToken;
            }
            return token
        },
        async session({ session, token, user }) {
            session.user.userToken = token.userToken
            session.user.id = token.id

            return session
        }
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                lemail: {label: "Login Email", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req) {
                try {
                    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_DOMAIN + "/auth/login", {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers: {"Content-Type": "application/json"}
                    })
                    const data = await res.json()
                    if (res.ok && data) {
                        return {
                            id: data.userId,
                            name: data.userName,
                            userToken: data.token,
                        }
                    }
                    else {
                        return null
                    }
                }
                catch(e) {
                    console.log({
                        err: e.toString()
                    })

                    return null
                }
            }
        })
    ],
    pages: {
        signIn: '/sign-in'
    }
};
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, authOptions }
