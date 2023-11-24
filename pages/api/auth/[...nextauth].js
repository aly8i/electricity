import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAdmin } from "../../../functions";
// import { useSession } from "next-auth/react";
var loggedIn = false;

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { username, password } = credentials;
        try {
          const admin = await getAdmin();
          console.log(admin);
          if (username === admin.username && password === admin.password) {
            loggedIn = true;
          }
          return loggedIn;
        } catch (error) {
          console.log("Error:", error);
          throw new Error("Something went wrong!");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session(session, loggedIn) {
      session.session.loggedIn = true;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
