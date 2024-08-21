"use client";

import { useEffect, useState } from "react";

import DynamicTable from "@/app/component/dynamic-table";
import Item from "../../ui/styled-paper";

import { getBooks } from "@/app/lib/actions";
// import { Prisma } from "@prisma/client";

// type Person = {
//   number: number;
//   author: string;
//   name: string;
//   category: string;
//   bookName: string;
//   status: "ACTIVE" | "INACTIVE";
// };

export default function Books() {
  const [books, setBooks] = useState<
    {
      id: string;
      bookName: string;
      author: string;
      category: string;
      status: string;
      updatedAt: Date | string;
      createdAt: Date | string;
      owner: {
        id: string;
        name: string;
        email: string;
        password: string;
        location: string;
        phoneNumber: string;
        status: string;
        updated_at: Date;
        created_at: Date;
      };
    }[]
  >([]);

  useEffect(() => {
    getBooks().then((res) => setBooks(res));
  }, []);

  console.log("Books", books);

  return (
    <Item
      sx={{
        p: 2,

        "& .MuiPaper-root:has(.MuiTableContainer-root)": {
          boxShadow: "none",
        },
      }}
    >
      {/* <DashboardTable /> */}
      <DynamicTable
        data={books.map((book, index) => ({
          //   ...book,
          //   number: number,
          author: book.author,
          //   name: string,
          category: book.category,
          bookName: book.bookName,
          status: book.status as "ACTIVE" | "INACTIVE",
          name: book.owner.name,
          number: ++index,
        }))}
      />
    </Item>
  );
}
