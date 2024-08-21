"use client";

import * as React from "react";
import Item from "@/app/ui/styled-paper";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import UpgradeIcon from "@mui/icons-material/Upgrade";

import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function BookUpload() {
  const [open, setOpen] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);

  const handleClose = (event: React.SyntheticEvent<Element, Event>) => {
    const button = event.target as HTMLButtonElement;
    button.nodeName === "BUTTON" ? setOpen(true) : setOpen(false);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleAddSelectClick = () => {
    setOpenModal(true);
  };

  return (
    <Item sx={{ height: "90vh", p: "50px 28px 50px 28px" }}>
      <Stack direction={"column"} alignItems={"center"} spacing={5}>
        <Typography variant="h5" fontWeight={500}>
          {" "}
          Upload New Book
        </Typography>

        <FormControl
          variant="filled"
          sx={{ m: 1, minWidth: 320, height: "188px" }}
        >
          <InputLabel id="demo-simple-select-filled-label" shrink={true}>
            Search book by name or Author
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            displayEmpty={true}
            renderValue={(selected: String) => {
              if (!selected) {
                return <em>Search...</em>;
              }

              return selected;
            }}
          >
            <MenuItem value={10}>Book 1</MenuItem>
            <MenuItem value={20}>Book 2</MenuItem>
            <Divider />
            {/* <MenuItem> */}
            <Button
              sx={{ width: "100%", justifyContent: "start", ml: 1 }}
              onClick={handleAddSelectClick}
            >
              Add
            </Button>
            {/* </MenuItem> */}
          </Select>
        </FormControl>
        <Stack direction={"row"} alignItems={"center"} spacing={3}>
          <FormControl sx={{ m: 1, minWidth: 320 }}>
            <InputLabel id="demo-simple-select-label">Book Quantity</InputLabel>
            <Select
              labelId="demo-simple-select-label-book-qty"
              id="demo-simple-select-book-qty"
              disabled
            ></Select>
          </FormControl>
          <TextField
            id="standard-error"
            label="Rant price for 2 weeks"
            disabled
            variant="outlined"
            sx={{ m: 1, minWidth: 320 }}
          />
        </Stack>

        <Button component="label" tabIndex={-1} startIcon={<UpgradeIcon />}>
          Upload Book Cover
          <VisuallyHiddenInput type="file" />
        </Button>

        <Button
          variant="contained"
          disableElevation
          sx={{ width: "321px", height: "74px", borderRadius: "20px" }}
        >
          Submit
        </Button>
      </Stack>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Item
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            //   width: 400,
            //   bgcolor: "background.paper",
            //   border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            width: "541px",
            height: "457px",
          }}
        >
          <Box
            component="form"
            //  action={formAction}
          >
            <Stack spacing={1} pt={2} pb={5}>
              <Typography variant="h4">{"Add Book"}</Typography>
              <Divider />
            </Stack>

            <Stack spacing={2}>
              <TextField
                id="book_name"
                label="Book Name"
                name="book_name"
                variant="outlined"
              />

              <TextField
                id="author_name"
                label="Author Name"
                name="author_name"
                variant="outlined"
              />
              <FormControl sx={{ m: 1, minWidth: 320 }}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label-book-qty"
                  id="demo-simple-select-book-qty"
                >
                  <MenuItem value={"Fiction"}>Fiction</MenuItem>
                  <MenuItem value={"Fiction"}>Fiction</MenuItem>
                </Select>
              </FormControl>

              <Button variant="contained" type="submit">
                {"Add"}
              </Button>
            </Stack>
            {/* {errorMessage && (
            <> */}
            {/* <ExclamationCircleIcon className="h-5 w-5 text-red-500" /> */}
            {/* <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )} */}
          </Box>
        </Item>
      </Modal>
    </Item>
  );
}
