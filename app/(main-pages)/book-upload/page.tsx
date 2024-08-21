"use client";

import * as React from "react";
import Item from "@/app/ui/styled-paper";
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
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
  const handleClose = (event: React.SyntheticEvent<Element, Event>) => {
    const button = event.target as HTMLButtonElement;
    button.nodeName === "BUTTON" ? setOpen(true) : setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
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
            <Button sx={{ width: "100%", justifyContent: "start", ml: 1 }}>
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

        <Button
          component="label"
          tabIndex={-1}
          startIcon={<UpgradeIcon />}
        >
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
    </Item>
  );
}
