import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import BasicButtons from "../components/buttons/BasicButtons";
import LabTabs from "../components/tabs/LabTabs";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login button clicked!");
    // Add your login logic here
  };

  const handleRegisterClick = () => {
    // Add your register navigation logic here
  };

  return (
    <Box
      component="form"
      sx={{
        mx: "auto",
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
      <TextField id="filled-basic" label="Username" variant="filled" />
      <TextField id="filled-basic" label="Password" variant="filled" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          "& > :not(style)": { m: 1 },
        }}
      >
        <BasicButtons text={"Submit"} onClick={handleLoginSubmit} />
        <BasicButtons text={"Clear"} onClick={handleRegisterClick} />
      </Box>
    </Box>
  );
};

export default Login;
