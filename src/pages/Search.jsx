import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "../components/cards/Card";
import { Button, Grid } from "@mui/material";
import { UserContext } from "../states/UserContext";

const Search = () => {
  const [search, setSearch] = useState("");
  const { tag, setTag, onClickTag } = React.useContext(UserContext);

  const onClickSave = () => {
    console.log(search, "search");
  };

  const onClickClear = () => {
    console.log(search, "search");
  };

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
          sx={{ width: "100%" }}
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
          width: "100%",
          height: "100%",
          borderRadius: "10px",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Card onClickTag={onClickTag} tag={tag} setTag={setTag} />
            <Card onClickTag={onClickTag} tag={tag} setTag={setTag} />
            <Card onClickTag={onClickTag} tag={tag} setTag={setTag} />
            <Card onClickTag={onClickTag} tag={tag} setTag={setTag} />
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button
                sx={{ margin: "10px", width: "300px" }}
                variant="contained"
                color="primary"
                onClick={() => onClickClear()}
              >
                Clear
              </Button>
              <Button
                sx={{ margin: "10px", width: "300px" }}
                variant="contained"
                color="primary"
                onClick={() => onClickSave()}
              >
                Save
              </Button>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                backgroundColor: "lightblue",
                width: "100%",
                height: "100%",
                borderRadius: "10px",
                margin: "10px",
              }}
              noValidate
              autoComplete="off"
            ></Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Search;
