import React from "react";
import Box from "@mui/material/Box";
import { useState, useContext } from "react";
import { Button, Grid } from "@mui/material";
import MapView from "../components/map/MapView";
import { SortableList } from "../components/dndboard/SortableList";
import { UserContext } from "../states/UserContext";
import Card from "../components/cards/Card";
import { Autocomplete } from "@react-google-maps/api";
import { v4 as uuidv4 } from "uuid";
import TextField from "@mui/material/TextField";

const Search = () => {
  const { savedLocations, setSavedLocations } = useContext(UserContext);
  const [autocomplete, setAutocomplete] = useState(null);
  const [coords, setCoords] = useState("");

  const onClickSave = () => {
    console.log("search");
  };

  const onClickClear = () => {
    console.log("search");
  };



  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      setSavedLocations([
        ...savedLocations,
        {
          place: {
            ...place,
            localId: uuidv4(),
          },
        },
      ]);
      setCoords(place.geometry.location.toJSON());
    }
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
            <div style={{ maxWidth: 800, margin: "30px auto" }}>
              <SortableList
                items={savedLocations}
                onChange={setSavedLocations}
                renderItem={(location) => (
                  <SortableList.Item id={location.place.localId}>
                    <Card location={location} />
                    <SortableList.DragHandle />
                  </SortableList.Item>
                )}
              />
            </div>
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
              <MapView coords={coords} setCoords={setCoords} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Search;
