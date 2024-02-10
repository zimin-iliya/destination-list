import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "../components/cards/Card";

const Search = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <Box
        sx={{
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "10px",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          sx={{ width: "500px" }}
          onChange={(e) => setSearch(e.target.value)}
          id="outlined-basic"
          label="Search"
          variant="outlined"
        />
      </Box>
      <Box
        sx={{
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "10px",
          backgroundColor: "lightgray",
          width: "500px",
          height: "500px",
          borderRadius: "10px",

        }}
      >
        <h1>map</h1>
      </Box>
      <Box
        sx={{
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "10px",
        }}
        noValidate
        autoComplete="off"
      >
        <Card />
        </Box>
    </>
  );
};

export default Search;
