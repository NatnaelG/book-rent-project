import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import { sql } from "@vercel/postgres";
// import type { User } from '@/app/lib/definitions';
import bcrypt from "bcrypt";
import prisma from "./app/lib/db";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  location: string;
  phoneNumber: string;
};

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log("formData", credentials);

        // const phoneSchema = z.string().min(6);

        // const formSchema = z.object({
        //   location: z.string(),
        //   phoneNumber: z.union([
        //     phoneSchema.when("location", {
        //       is: "United States",
        //       then: phoneSchema,
        //       otherwise: z.optional(phoneSchema),
        //     }),
        //   ]),
        // });
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
            confirmPassword: z.string().min(6).optional(),
            location: z.string().optional(),
            phoneNumber: z.string().min(9).optional(),
            name: z.string().optional(),
          })
          // .required({
          //   email: true,
          //   password: true,
          //   confirmPassword: credentials.type === "Sign up",
          //   location: z.string().min(6),
          //   phoneNumber: z.string().min(6),
          // })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const {
            email,
            password,
            name = "",
            location = "",
            phoneNumber = "",
          } = parsedCredentials.data;

          if (credentials.type === "Sign Up") {
            console.log("parsedCredentials", parsedCredentials);
            const hashedPassword = await bcrypt.hash(password, 10);
            // const insertedUser = await sql<User>`
            //   INSERT INTO users (name, email, password, location, phoneNumber)
            //   VALUES (${name}, ${email}, ${hashedPassword}, ${location}, ${phoneNumber})
            //   ON CONFLICT (id) DO NOTHING;
            // `;
            const insertedUser = await prisma.user.create({
              data: {
                email: email,
                location: location,
                name: name,
                password: hashedPassword,
                phoneNumber: phoneNumber
              }
            });
            console.log("insertedUser", insertedUser);
          }
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
