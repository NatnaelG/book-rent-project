import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Typography } from "@mui/material";

//example data type
type Person = {
  number: number;
  author: string;
  name: string;
  category: string;
  bookName: string;
  status: string;
};


//nested data is ok, see accessorKeys in ColumnDef below
const data: Person[] = [
  {
    number: 1,
    author: "Harry",
    name: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: "Kentucky",
  },
  {
    number: 1,
    author: "Harry",
    name: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: "Kentucky",
  },
  {
    number: 1,
    author: "Harry",
    name: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: "Kentucky",
  },
  {
    number: 1,
    author: "Harry",
    name: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: "Kentucky",
  },
  {
    number: 1,
    author: "Harry",
    name: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: "Kentucky",
  },
  {
    number: 1,
    author: "Harry",
    name: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: "Kentucky",
  },
  {
    number: 1,
    author: "Harry",
    name: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: "Kentucky",
  },
  {
    number: 1,
    author: "Harry",
    name: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: "Kentucky",
  },
  {
    number: 1,
    author: "Harry",
    name: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: "Kentucky",
  },
  {
    number: 1,
    author: "Harry",
    name: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: "Kentucky",
  },
  {
    number: 1,
    author: "Harry",
    name: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: "Kentucky",
  },
  {
    number: 1,
    author: "Harry",
    name: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: "Kentucky",
  },
  {
    number: 1,
    author: "Harry",
    name: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: "Kentucky",
  },
];

const DynamicTable = () => {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "number", //access nested data with dot notation
        header: "No.",
        size: 50,
      },
      {
        accessorKey: "author", //access nested data with dot notation
        header: "Author",
        size: 150,
      },
      {
        accessorKey: "name",
        header: "Owner",
        size: 150,
      },
      {
        accessorKey: "category", //normal accessorKey
        header: "Category",
        size: 200,
      },
      {
        accessorKey: "bookName",
        header: "Book Name",
        size: 150,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableSorting: false,
    enablePagination: false,
    enableColumnActions: false,
    enableBottomToolbar: false,
    renderTopToolbarCustomActions: () => (
      <Typography variant="h6" fontWeight={600}>
        List of Owner
      </Typography>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default DynamicTable;
