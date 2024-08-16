import * as React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridColDef,
  GridRenderCellParams,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useRouter } from 'next/navigation'

const rows = [
  { id: 1, bookNumber: 6450, bookName: "Snow", status: "FREE", price: 40.0 },
  {
    id: 2,
    bookNumber: 6450,
    bookName: "Lannister",
    status: "RENTED",
    price: 40.0,
  },
  {
    id: 3,
    bookNumber: 6450,
    bookName: "Lannister",
    status: "RENTED",
    price: 40.0,
  },
  { id: 4, bookNumber: 6450, bookName: "Stark", status: "RENTED", price: 40.0 },
  {
    id: 5,
    bookNumber: 6450,
    bookName: "Targaryen",
    status: "RENTED",
    price: 40.0,
  },
  {
    id: 6,
    bookNumber: 6450,
    bookName: "Melisandre",
    status: "RENTED",
    price: 40.0,
  },
  {
    id: 7,
    bookNumber: 6450,
    bookName: "Clifford",
    status: "RENTED",
    price: 40.0,
  },
  {
    id: 8,
    bookNumber: 6450,
    bookName: "Frances",
    status: "RENTED",
    price: 40.0,
  },
  { id: 9, bookNumber: 6450, bookName: "Roxie", status: "RENTED", price: 40.0 },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <Typography variant="subtitle1" fontWeight={800}>
        Live Book Status
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector
        slotProps={{ tooltip: { title: "Change density" } }}
      />
      <GridToolbarExport
        slotProps={{
          tooltip: { title: "Export data" },
        }}
      />
    </GridToolbarContainer>
  );
}

export default function DashboardTable() {
    const router = useRouter()
    function handleEditClick() {
        router.push('/books')
    }
    const columns: GridColDef[] = [
        { field: "id", headerName: "No.", width: 90 },
        { field: "bookNumber", headerName: "Book no.", width: 120 },
        { field: "bookName", headerName: "Book Name", width: 220 },
        {
          field: "status",
          headerName: "Status",
          width: 120,
          type: "singleSelect",
          sortable: false,
          valueOptions: [{ value: "FREE" }, { value: "RENTED" }],
          renderCell: (params: GridRenderCellParams<any, String>) => (
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <CircleIcon
                fontSize="inherit"
                color={params.value === "RENTED" ? "error" : "primary"}
              />{" "}
              <Typography sx={{ textTransform: "capitalize" }}>
                {params.value?.toLowerCase()}
              </Typography>
            </Stack>
          ),
        },
        {
          field: "price",
          headerName: "Price",
          type: "number",
          // description: "This column has a value getter and is not sortable.",
          sortable: false,
          width: 120,
          // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
          valueFormatter: (value?: number) => {
            if (value == null) {
              return "";
            }
            return `${value.toLocaleString()} Birr`;
          },
        },
        {
          field: "actions",
          headerName: "Action",
          type: "actions",
          width: 150,
          getActions: (params) => [
            <GridActionsCellItem
              icon={<EditIcon sx={{ color: "#000" }} />}
              label="Edit"
              key={params.id}
              onClick={handleEditClick}
              // showInMenu
            />,
            <GridActionsCellItem
              icon={<DeleteIcon color={"error"} />}
              key={params.id}
              label="Delete"
              // onClick={deleteUser(params.id)}
            />,
          ],
        },
      ];
      
  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          alignContent: "center",
        },
        "& .MuiDataGrid-toolbarContainer": {
          "& .MuiButtonBase-root": {
            minWidth: "auto",
            color: "#424242"
          },
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnMenu
        slots={{
          toolbar: CustomToolbar,
        }}
        localeText={{
          toolbarColumns: "",
          toolbarFilters: "",
          toolbarExport: "",
          toolbarDensity: "",
        }}
        hideFooterPagination={true}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
