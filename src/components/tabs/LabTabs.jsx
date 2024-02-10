import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import BasicButtons from "../buttons/BasicButtons";
import Login from "../../authorization/Login";
import SignUp from "../../authorization/SignUp";
import { Navigate } from "react-router-dom";

export default function LabTabs() {
  const [value, setValue] = useState("2");
  const [redirect, setRedirect] = useState(false);

  const handleTrail = () => {
    setRedirect(true);
  };

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };


  if (redirect) {
    return <Navigate to="/search" />;
  }

  return (
    <Box sx={{ width: "300px", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="login" value="1" />
            <Tab label="Sign up" value="2" />
            <Tab label="Trial" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Login />
        </TabPanel>
        <TabPanel value="2">
          <SignUp />
        </TabPanel>
        <TabPanel value="3">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BasicButtons text={"Trial"} onClick={handleTrail} />
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
