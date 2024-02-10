import React from 'react';
import Box from "@mui/material/Box";
import LabTabs from "../components/tabs/LabTabs";

const OAuth = () => {

    return (
        <Box
        sx={{
          mx: "auto",
          width: "800px",
          minwidth: "50vhd",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "10%",
          border: "1px solid black",
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <LabTabs />
      </Box>
    );
};

export default OAuth;