import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "../components/cards/Card";
import { Button, Grid } from "@mui/material";
import { UserContext } from "../states/UserContext";
import { useContext } from "react";
import MapView from "../components/map/MapView";

const Search = () => {
  const { user,savedLocations, setSavedLocations } = useContext(UserContext);

  const onClickSave = () => {
    console.log("search");
  };

  const onClickClear = () => {
    console.log("search");
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
          backgroundColor: "lightgray",
          width: "100%",
          height: "100dvh",
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
            {savedLocations.map ((location) => {
              return <Card location={location} />;
            }
            )}

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
                height: "80svh",
                borderRadius: "10px",
                margin: "10px",
              }}
              noValidate
              autoComplete="off"
            >
              <MapView />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Search;
