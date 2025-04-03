import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import db from "../../../../db/index";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    // Google Provider for OAuth with Gmail Scope
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent", // Forces Google to show the consent screen
          access_type: "offline", // Ensures refresh token is provided
          response_type: "code",
          scope:
            "openid email profile https://www.googleapis.com/auth/gmail.readonly", // Added Gmail scope
        },
      },
    }),
    // GitHub Provider for OAuth
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    // Credentials Provider (Manual Sign-In/Sign-Up)
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        firstName: { label: "First Name", type: "text" },
        lastName: { label: "Last Name", type: "text" },
      },
      async authorize(credentials: any): Promise<any> {
        const { email, password, firstName, lastName } = credentials;

        // Check if the user already exists
        let user = await db.user.findFirst({
          where: { email },
        });

        // Sign-Up: Create a new user if one doesn't exist
        if (!user && firstName && lastName) {
          const hashedPassword = await bcrypt.hash(password, 10);
          user = await db.user.create({
            data: {
              email,
              password: hashedPassword,
              firstName,
              lastName,
            },
          });
        }

        // Sign-In: Verify password if user exists
        if (user && user.password) {
          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect password");
          }
        }

        // No user and no sign-up details
        throw new Error("User not found or invalid details");
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id?.toString();
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
