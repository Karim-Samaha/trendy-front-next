import { getServerSession, type NextAuthOptions } from "next-auth";
import Credentials from "node_modules/next-auth/providers/credentials";
import { userService } from "./services/userService";
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
        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          body: JSON.stringify({
            email: credentials.username,
            password: credentials.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();
        if (res.ok && user) {
          console.log({ user });
          return user;
        } else {
          return null;
        }
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
      let user = token.user;
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
