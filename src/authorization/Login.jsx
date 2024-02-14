import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import BasicButtons from "../components/buttons/BasicButtons";
import LabTabs from "../components/tabs/LabTabs";

const Login = ({
  loginGoogle,
  loginPassword,
  email,
  setEmail,
  password,
  setPassword,
}) => {
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
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id="filled-email"
        label="Email"
        variant="filled"
      />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="filled-password"
        label="Password"
        variant="filled"
        type="password"
      />{" "}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          "& > :not(style)": { m: 1 },
        }}
      >
        <BasicButtons text={"Sign in"} onClick={() => loginPassword()} />
        <BasicButtons
          text={"Sign in with Google"}
          onClick={() => loginGoogle()}
        />
      </Box>
    </Box>
  );
};

export default Login;
