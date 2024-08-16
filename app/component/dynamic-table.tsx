import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import {
  Chip,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";

//example data type
type Person = {
  number: number;
  author: string;
  name: string;
  category: string;
  bookName: string;
  status: "ACTIVE" | "INACTIVE";
};

//nested data is ok, see accessorKeys in ColumnDef below
const data: Person[] = [
  {
    number: 1,
    author: "Harry",
    name: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: "INACTIVE",
  },
  {
    number: 2,
    author: "Harry",
    name: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: "ACTIVE",
  },
  {
    number: 3,
    author: "Harry",
    name: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: "ACTIVE",
  },
  {
    number: 4,
    author: "Harry",
    name: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: "ACTIVE",
  },
  {
    number: 5,
    author: "Harry",
    name: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: "ACTIVE",
  },
  {
    number: 6,
    author: "Harry",
    name: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: "ACTIVE",
  },
  {
    number: 7,
    author: "Harry",
    name: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: "ACTIVE",
  },
  {
    number: 8,
    author: "Harry",
    name: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: "ACTIVE",
  },
  {
    number: 9,
    author: "Harry",
    name: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: "ACTIVE",
  },
  {
    number: 10,
    author: "Harry",
    name: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: "ACTIVE",
  },
  {
    number: 11,
    author: "Harry",
    name: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: "ACTIVE",
  },
  {
    number: 12,
    author: "Harry",
    name: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: "ACTIVE",
  },
  {
    number: 13,
    author: "Harry",
    name: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: "ACTIVE",
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
        muiTableHeadCellProps: {
          sx: {
            "& .Mui-TableHeadCell-Content": {
              justifyContent: "center",
            },
          },
        },
        Cell: ({ renderedCellValue, row }) => (
          <FormControlLabel
            value="start"
            sx={{
              background:
                renderedCellValue === "ACTIVE" ? "#0080001A" : "#8000001A",
              borderRadius: "15px",
              p: 1,
              mx: 0,
            }}
            control={
              <Switch
                color={renderedCellValue === "ACTIVE" ? "success" : "error"}
                checked={renderedCellValue === "ACTIVE"}
                name={`status-${row.original.number}`}
                size="small"
                sx={{
                  width: "75px",
                  "& .MuiButtonBase-root": {
                    "& .MuiSwitch-thumb": {
                      ml: renderedCellValue === "ACTIVE" ? "35px" : 0,
                    },
                  },
                }}
              />
            }
            label={
              <Stack direction={"row"} spacing={1}>
                <CheckIcon
                  fontSize="small"
                  color={renderedCellValue === "ACTIVE" ? "success" : "error"}
                />
                <Typography
                  sx={{
                    color:
                      renderedCellValue === "ACTIVE" ? "#2e7d32" : "#d32f2f",
                    textTransform: "capitalize",
                  }}
                  variant="subtitle2"
                >
                  {(renderedCellValue + "")?.toLowerCase()}
                </Typography>
              </Stack>
            }
            labelPlacement="start"
          />
          // <Chip
          //   icon={
          //     <CheckIcon
          //       color={renderedCellValue === "ACTIVE" ? "success" : "error"}
          //     />
          //   }
          //   label={renderedCellValue}
          //   color={renderedCellValue === "ACTIVE" ? "success" : "error"}
          //   variant="outlined"
          // />
        ),
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
