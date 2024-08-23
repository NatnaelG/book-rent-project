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
import { deleteSession, getSession } from "./session";
// import defineAbilityFor from "./ability";
import { useAbilityContext } from "./can";
import { updateAbility } from "./updateAbilities";
// import { Ability, AbilityBuilder } from "@casl/ability";
// import { useContext } from "react";
// import { useAbilityContext } from "./can";
// import { updateAbility } from "./updateAbilities";

// import { decrypt } from "@/app/lib/session";
// import { cookies } from "next/headers";
// ...

// import { AbilityBuilder, Ability } from '@casl/ability';
// import React, { useState, useContext } from 'react';
// import { AbilityContext } from './Can';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  location: string;
  phoneNumber: string;
  status: string;
  role: string;
  isAdmin: boolean;
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
  console.log("HI what's up", formData);
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
      // isAdmin: formData.get("isAdmin") || undefined,
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
        isAdmin: formData.get("isAdmin") === "on",
        role: formData.get("isAdmin") === "on" ? "Admin" : "Owner",
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
  await createSession(user.id, user.status, user.role, user.isAdmin);


// console.log("hi there", temp)
  // const defineAbilityFor = useAbilityContext;

  // defineAbilityFor()(user);

  // const ability = defineAbilityFor(user);
  // console.log("ability", ability)
  // updateAbility(ability, user)
  // const ability = defineAbilityFor(user);
  // return user;
  redirect("/dashboard");
}

export async function getUserBySession() {
  const session = await getSession();

  if (session === null || session === undefined) return null;
  const user = await prisma.user.findFirst({
    where: {
      id: session.id
    }
  })

  return user || null;
}

export async function uploadBook(values: {
  book_name: string;
  author_name: string;
  category: string;
}) {
  const session = await getSession();

  if (session === null || session === undefined) return "Something went wrong.";
  // if (!session?.id) return "Something went wrong.";

  console.log("values", values, session);
  try {
    const insertedBook = await prisma.book.create({
      data: {
        author: values.author_name,
        bookName: values.book_name,
        category: values.category,
        owner: { connect: { id: session.id } },
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
