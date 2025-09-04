import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "ankit@gmail.com" },
        password: { label: "Password", type: "password" },
      },

      
      async authorize(credentials, req) {
        // Here  validate credentials
        if (
          credentials?.username === "ankit@gmail.com" &&
          credentials?.password === "123456"
        ) {
          return { id: "1", name: "Ankit Sharma", email: "ankit@gmail.com" }
        }

        // If login fails, return null
        return null
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
