import type { DefaultSession, Session } from "next-auth";
export { Session };

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "USER";
      phone?: string;
    } & DefaultSession["user"];
  }
}
