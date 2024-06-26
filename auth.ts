import { sql } from "@vercel/postgres";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "text" },
      },
      async authorize(credentials) {
        // Check if credentials exist and if they are strings
        if (
          typeof credentials?.email !== "string" ||
          typeof credentials?.password !== "string"
        ) {
          throw new Error("Invalid credentials format.");
        }

        const response = await sql`
            SELECT * from users
            WHERE email = ${credentials?.email}
        `;

        const user = response.rows[0];
        console.log({ user });
        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        const passwordCorrect = await compare(
          credentials?.password,
          user.password
        );

        console.log({ passwordCorrect });

        if (passwordCorrect) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        }

        return null;
      },
    }),
  ],
});
