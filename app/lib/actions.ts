"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
// import type { User } from '@/app/lib/definitions';
import bcrypt from "bcrypt";
import { createSession } from "./session";
import { redirect } from "next/navigation";

// import { signIn } from "@/auth";
// import { AuthError } from "next-auth";
import prisma from "./db";
import { deleteSession } from "./session";

// import { decrypt } from "@/app/lib/session";
// import { cookies } from "next/headers";
// ...

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  location: string;
  phoneNumber: string;
  status: string;
};

async function getUser(email: string): Promise<User | null> {
  return await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
}

export async function signout() {
  deleteSession();
  redirect("/login");
  // await signOut();
}

// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData
// ) {
//   try {
//     await signIn("credentials", formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return "Invalid credentials.";
//         default:
//           return "Something went wrong.";
//       }
//     }
//     throw error;
//   }
// }

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
        location?: string[];
        phoneNumber?: string[];
      };
      message?: string;
    }
  | undefined;

export async function authenticate(state: FormState, formData: FormData) {
  console.log("HI what's up");
  // Validate form fields
  const validatedFields = z
    .object({
      email: z.string().email(),
      password: z.string().min(6),
      confirmPassword: z.string().min(6).optional(),
      location: z.string().optional(),
      phoneNumber: z.string().min(9).optional(),
      name: z.string().optional(),
    })
    .safeParse({
      name: formData.get("name") || undefined,
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword") || undefined,
      location: formData.get("location") || undefined,
      phoneNumber: formData.get("phoneNumber") || undefined,
    });

  // console.log("validatedFields", validatedFields, validatedFields.error.flatten()?.fieldErrors, validatedFields.error.flatten()?.formErrors);

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    email,
    password,
    name = "",
    location = "",
    phoneNumber = "",
  } = validatedFields.data;

  if (formData.get("type") === "Sign Up") {
    console.log("validatedFields", validatedFields);
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
        phoneNumber: phoneNumber,
      },
    });
    console.log("insertedUser", insertedUser);
  }

  const user = await getUser(email);
  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    return {
      message: "Invalid credentials!",
    };
  }
  await createSession(user.id, user.status);
  // return user;
  redirect("/dashboard");
}

export async function uploadBook(values: {
  book_name: string;
  author_name: string;
  category: string;
}) {
  // const cookie = cookies().get("session")?.value;
  // const session = await decrypt(cookie);

  console.log("values", values);
  try {
    const insertedBook = await prisma.book.create({
      data: {
        author: values.author_name,
        bookName: values.book_name,
        category: values.category,
        owner: { connect: { id: "2a2d6737-cf10-430a-9791-44ac7cc1309c" } },
      },
    });

    console.log("insertedBook", insertedBook);
    return "Success";
  } catch (error) {
    console.log("insertedBookError", error);
    return "Something went wrong.";
  }
}

export async function getBooks(params: { id: string; value: string }[] | null) {
  console.log("Params", params);
  // let query = params !== null && params?.length > 0 ? { ["where"]: {} } : {};
  let query = { where: {} };

  params?.map((param) => {
    if (query.where !== undefined) {
      if (param.id === "name") {
        query.where = {
          ...query.where,
          owner: { [param.id]: { contains: param.value } },
        };
        // query.where["owner"][param.id] = { contains: param.value };
      } else {
        query.where = {
          ...query.where,
          [param.id]: { contains: param.value },
        };
        // query.where[param.id] = { contains: param.value };
      }
    }
    console.log("query0", query);
    return param;
  });

  return await prisma.book.findMany({
    ...query,
    include: {
      owner: true,
    },
  });
}
