import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      accessToken?: unknown;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
  }
}
