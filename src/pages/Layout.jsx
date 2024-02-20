import React from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Header from "../components/navbar/Header";


function Layout() {
  return (
    <div className="container">
      <Box>
        <Header />
      </Box>
      <Outlet />
      
    </div>
  );
}

export default Layout;
