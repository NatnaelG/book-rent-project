"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import prisma from "./db";

// import { decrypt } from "@/app/lib/session";
// import { cookies } from "next/headers";
// ...

export async function signout() {
  await signOut();
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
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
        owner: { connect: { id: "d72338d3-8742-47a4-a6ec-37cf6e6ada3e" } },
      },
    });

    console.log("insertedBook", insertedBook);
    return "Success";
  } catch (error) {
    console.log("insertedBookError", error);
    return "Something went wrong.";
  }
}

export async function getBooks() {
  return await prisma.book.findMany({
    include: {
      owner: true,
    },
  });
}
