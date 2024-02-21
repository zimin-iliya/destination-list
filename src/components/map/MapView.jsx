import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Box, Button } from "@mui/material";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useContext } from "react";
import { UserContext } from "../../states/UserContext";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { useState, useRef, useEffect, useMemo } from "react";
import TextField from "@mui/material/TextField";

const MapView = () => {
  // const { libraries } = useContext(UserContext);
  const ipiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const [autocomplete, setAutocomplete] = useState(null);
  const [search, setSearch] = useState("");
  const [coords, setCoords] = useState("");
  const [coords2, setCoords2] = useState("");
  const [direction, setDirection] = useState(null);
  const [distance, setdistance] = useState("");
  const [duration, setduration] = useState("");
  const [map, setMap] = useState(/**@type google.maps.map */ (null));
  const libraries = useMemo(() => ["places", "geometry"], []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: ipiKey,
    libraries,
  });

  // console.log(distance, "distance");
  // console.log(duration, "duration");
  // console.log(direction, "direction");
  // console.log(search, "search");
  // console.log(originRef?.current?.value, "originRef");
  console.log(coords2, "coords2");

  if (!isLoaded) {
    return <Skeleton variant="rectangular" width="100%" height="100%" />;
  }

  async function getDistance() {
    if (originRef.current.value === "" && destiantionRef.current.value === "") {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    const waypoints = [
      { location: coords2 },

      // Add more stops here
    ];

    const result = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      waypoints: waypoints,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    setDirection(result);
    setdistance(result.routes[0].legs[0].distance.text);
    setduration(result.routes[0].legs[0].duration.text);
  }

  const clearRoutes = () => {
    setDirection(null);
    setdistance("");
    setduration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      setCoords2(place);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vhd",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "lightgray",
      }}
    >
      <Autocomplete
        onPlaceChanged={onPlaceChanged}
        onLoad={(autoC) => setAutocomplete(autoC)}
      >
        <TextField
          sx={{ width: "100%" }}
          id="outlined-basic"
          label="Search"
          variant="outlined"
        />
      </Autocomplete>
      {/* <input
          sx={{ width: "100%" }}
          id="outlined-basic"
          label="Search"
          variant="outlined"
        /> */}
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={coords}
        zoom={12}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          fullscreenControl: false,
        }}
        onLoad={(map) => {
          setMap(map);
        }}
      >
        <Marker
          position={{ lat: 32.0684, lng: 34.8248 }}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          }}
        />

        {direction && <DirectionsRenderer directions={direction} />}
      </GoogleMap>
      <Box
        sx={{
          mx: "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: "10px",
        }}
        noValidate
        autoComplete="on"
      >
        <Button
          onClick={() => {
            if (coords.lat !== 0 && coords.lng !== 0) {
              map.panTo(coords);
            }
          }}
        >
          Reset Position
        </Button>
        <Button onClick={getDistance}>Get Distance</Button>
        <Button onClick={clearRoutes}>Clear</Button>

        <Autocomplete>
          <input
            ref={originRef}
            sx={{ width: "100%" }}
            onChange={(e) => setSearch(e.target.value)}
            id="outlined-basic"
            label="Search"
            variant="outlined"
          />
          {/* <TextField
            ref={originRef}
            sx={{ width: "100%" }}
            onChange={(e) => setSearch(e.target.value)}
            id="outlined-basic"
            label="Search"
            variant="outlined"
          /> */}
        </Autocomplete>
        <Autocomplete>
          <input
            ref={destiantionRef}
            sx={{ width: "100%" }}
            onChange={(e) => setSearch(e.target.value)}
            id="outlined-basic"
            label="Search"
            variant="outlined"
          />
          {/* <TextField
            ref={destiantionRef}
            sx={{ width: "100%" }}
            // onChange={(e) => setSearch(e.target.value)}
            id="outlined-basic"
            label="Search"
            variant="outlined"
          /> */}
        </Autocomplete>
      </Box>
    </Box>
  );
};

export default MapView;
