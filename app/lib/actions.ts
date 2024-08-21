"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import prisma from "./db";

import { decrypt } from '@/app/lib/session'
import { cookies } from 'next/headers'
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

export async function uploadBook(formData: FormData) {
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)
 
  await prisma.book.create({
    data: {
      author: formData.get("author") as string,
      bookName: formData.get("bookName") as string,
      category: formData.get("category") as string,
      owner: "d72338d3-8742-47a4-a6ec-37cf6e6ada3e"
    }
  });
}
