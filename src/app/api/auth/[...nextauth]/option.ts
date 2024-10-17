import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userName: {
          label: "UserName:",
          type: "text",
          placeholder: "your username",
        },
        password: {
            label: "Password",
            type: 'password',
            placeholder: "your password"
        }
      },
      async authorize(credentials, req) {
        const res = await fetch("/auth/register", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    newUser: "/auth/register",
    signIn: "/auth/login",
    verifyRequest: "/auth/email-verification",
  },
};
