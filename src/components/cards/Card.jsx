import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Grid } from "@mui/material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../states/UserContext";

export default function Card(location) {
  const [label, setLabel] = useState("");

  const { user, savedLocations, setSavedLocations } = useContext(UserContext);

  console.log(location.location.place?.geometry?.location?.toJSON(), "location");
  console.log(location.location.place?.name, "location");
  console.log(savedLocations, "savedLocations");
  console.log(location, "locationRAW");


  const handleChange = (event) => {
    setLabel(event.target.value);
    console.log(event.target.value, "event.target.value");
    console.log(label, "label");
  };

  const onClickDelete = () => {
    console.log("delete");

  };

  return (
    <>
      <Box
        sx={{
          marginTop: "10px",
          width: "100%",
          minHeight: "100px",
          maxHeight: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "darkgray",
          borderRadius: "10px",
          mx: 2,
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Grid item xs={12} sm={6} md={6} >
            <h3>{location.location.place?.name}</h3>
            <p>{location.location.place?.geometry?.location?.toJSON().lat}</p>
            <p>{location.location.place?.geometry?.location?.toJSON().lng}</p>
            {/* <p>{location.location.place?.place.international_phone_number }</p> */}

            <p>{location.location.place?.formatted_address}</p>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
            }}
          >
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-required-label">
                Label
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={label}
                label="tag *"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Sport"}>Sport</MenuItem>
                <MenuItem value={"Restaurant"}>Restaurant </MenuItem>
                <MenuItem value={"Art"}>Art</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
            <Button>
              <DeleteForeverIcon onClick={() => {
                onClickDelete();
              }} />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
