import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Box, Button } from "@mui/material";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useContext } from "react";
import { UserContext } from "../../states/UserContext";
import { useState } from "react";

const MapView = () => {
  const { libraries } = useContext(UserContext);
  const ipiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const [map, setMap] = useState(/**@type google.maps.map */(null));
  const [start, setStart] = useState({ lat: 32.0684, lng: 34.8248 });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: ipiKey,
  });

  if (!isLoaded) {
    return <Skeleton variant="rectangular" width={210} height={118} />;
  }

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
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={start}
        zoom={12}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          fullscreenControl: false,
        }}
        onLoad={map => {
          setMap(map);
        }}
      >
        <Marker
          position={{ lat: 32.0684, lng: 34.8248 }}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          }}
        />
      </GoogleMap>
      <Button
        onClick={() => {
          map.panTo(start);
        }}
      >Reset Position</Button>
    </Box>
  );
};

export default MapView;
