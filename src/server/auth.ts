import { getServerSession, type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
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
        name: { label: "name", type: "name" },
        phone: { label: "phone", type: "phone" },
      },

      async authorize(credentials) {
        let body = {
          email: credentials.username,
          password: credentials.password,
        };
        if (credentials?.name) {
          body.name = credentials.name;
        }
        if (credentials?.phone) {
          body.phone = credentials.phone;
        }
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();
        if (user?.error === "wrongCredintials") {
          throw new Error(JSON.stringify({ user, status: false }));
        } else {
          return user;
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
      let user = await token.user;
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
  secret: process.env.JWT_SIGNING_PRIVATE_KEY,
};

export const getServerAuthSession = () => getServerSession(authOptions); //(6)
