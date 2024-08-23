"use client";

import { useEffect, useState } from "react";

import DynamicTable from "@/app/component/dynamic-table";
import Item from "../../ui/styled-paper";

import { getBooks } from "@/app/lib/actions";

export default function Owners() {

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
        // password: string;
        location: string;
        phoneNumber: string;
        status: string;
        updated_at: Date;
        created_at: Date;
      };
    }[]
  >([]);

  const fetchBooks = (params: { id: string; value: string }[] | null = null) =>
    getBooks(params).then((res) => setBooks(res));

  useEffect(() => {
    fetchBooks();
  }, []);

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
        books={books.map((book, index) => ({
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
        fetchBooks={fetchBooks}
      />
    </Item>
  );
}
