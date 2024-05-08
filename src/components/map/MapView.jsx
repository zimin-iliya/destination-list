import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Box, Button } from "@mui/material";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  InfoWindowF,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useState, useRef, useEffect, useMemo } from "react";
import TextField from "@mui/material/TextField";
import { useContext } from "react";
import { UserContext } from "../../states/UserContext";
import { v4 as uuidv4 } from "uuid";
import picture from "../../utils/icons8.png";

const MapView = () => {
  const ipiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const [autocomplete, setAutocomplete] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [search, setSearch] = useState("");
  const [coords, setCoords] = useState("");
  const [localCoords, setlocalCoords] = useState([]);
  const [direction, setDirection] = useState(null);
  const [distance, setdistance] = useState("");
  const [duration, setduration] = useState("");
  const [optimizeWaypoints, setOptimizeWaypoints] = useState(false);
  const [map, setMap] = useState(/**@type google.maps.map */ (null));
  const libraries = useMemo(() => ["places", "geometry", "marker"], []);

  const { savedLocations, setSavedLocations } = useContext(UserContext);

  const markers = savedLocations.map((location) => {
    return {
      id: location.place.localId,
      name: location.place.name,
      position: location.place.geometry.location,
    };
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setlocalCoords({ lat: latitude, lng: longitude });
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

  if (!isLoaded) {
    return <Skeleton variant="rectangular" width="100%" height="100%" />;
  }

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  async function getDistance() {
    const directionsService = new window.google.maps.DirectionsService();

    const waypoints = savedLocations.map((location) => {
      return {
        location: location.place?.name,
        stopover: true,
      };
    });

    const result = await directionsService.route({
      origin: originRef.current.value ? originRef.current.value : localCoords,
      destination: destiantionRef.current.value,
      waypoints: waypoints,
      optimizeWaypoints: optimizeWaypoints,
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
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={localCoords}
        zoom={12}
        onClick={() => {
          setActiveMarker(null);
        }}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          fullscreenControl: false,
        }}
        onChange={(e) => {
          setCoords(e.center.toJSON());
        }}
        onLoad={(map) => {
          setMap(map);
        }}
      >
        {markers.map(({ id, name, position }) => (
          <MarkerF
            key={id}
            position={position}
            onClick={() => handleActiveMarker(id)}
            icon={{
              url: "https://t4.ftcdn.net/jpg/02/85/33/21/360_F_285332150_qyJdRevcRDaqVluZrUp8ee4H2KezU9CA.jpg",
              scaledSize: { width: 50, height: 50 },
            }}
          >
            {activeMarker === id ? (
              <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                <div>
                  <p>{name}</p>
                </div>
              </InfoWindowF>
            ) : null}
          </MarkerF>
        ))}

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
              map.panTo(localCoords);
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
        </Autocomplete>
      </Box>
    </Box>
  );
};

export default MapView;
