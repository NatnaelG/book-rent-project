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
        query.where[param.id] = { contains: param.value };
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
