import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import BasicButtons from "../components/buttons/BasicButtons";

const SignUp = ({
  handleSignup,
  SignupClear,
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
        <BasicButtons text={"Clear"} onClick={SignupClear} />
        <BasicButtons text={"SIGN UP"} onClick={handleSignup} />
      </Box>
    </Box>
  );
};

export default SignUp;
