import { getServerSession, type NextAuthOptions } from "next-auth";
import Credentials from "node_modules/next-auth/providers/credentials";
import axios from "axios";
import { use } from "react";

export const authOptions: NextAuthOptions = {
  // session: {
  //   strategy: "jwt", //(1)
  // },
  // callbacks: {
  //   async jwt({ token, account, profile }) {
  //     console.log("sadsad");

  //     if (account && account.type === "credentials") {
  //       //(2)
  //       console.log("sadsad");

  //       token.userId = account.providerAccountId; // this is Id that coming from authorize() callback
  //     }
  //     console.log(".....a..........");

  //     return token;
  //   },
  //   // async session({ session, token, user }) {
  //   //   session.user.id = token.userId; //(3)
  //   //   console.log(".......ww........");

  //   //   return session;
  //   // },
  // },
  pages: {
    signIn: "/login",
    error: "/login", //(4) custom signin page path
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials.username,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();
        return user;
      },
    }),
  ],
  session: {
    jwt: true,
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 * 60,
  },
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  callbacks: {
    async session({ session, token }) {
      let user = await token.user;
      console.log({ user1: user });
      session.user = {
        ...user,
      };
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};

export const getServerAuthSession = () => getServerSession(authOptions); //(6)
