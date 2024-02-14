import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import BasicButtons from "../components/buttons/BasicButtons";

const SignUp = ({
  handleSignup,
  SignupClear,
  UserName,
  setUserName,
  password,
  setPassword,
  email,
  setEmail,
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
        value={UserName}
        onChange={(e) => setUserName(e.target.value)}
        id="filled-basic"
        label="Username"
        variant="filled"
      />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="filled-password"
        label="Password"
        variant="filled"
        type="password"
      />
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id="filled-email"
        label="Email"
        variant="filled"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          "& > :not(style)": { m: 1 },
        }}
      >
        <BasicButtons text={"SIGN UP"} onClick={handleSignup} />
        <BasicButtons text={"Clear"} onClick={SignupClear} />
      </Box>
    </Box>
  );
};

export default SignUp;
