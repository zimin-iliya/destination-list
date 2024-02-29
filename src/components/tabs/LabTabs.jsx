import * as React from "react";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../states/UserContext";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import BasicButtons from "../buttons/BasicButtons";
import Login from "../../authorization/Login";
import SignUp from "../../authorization/SignUp";
import { Navigate } from "react-router-dom";
import { supabase } from "../../authorization/Supabase";

export default function LabTabs() {
  const { user } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [value, setValue] = useState("1");
  const [redirect, setRedirect] = useState(false);

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.log("error", error);
    }
    if (data) {
      console.log("handleSignup", data, error);
      redirect(true);
    }
  };
  const SignupClear = () => {
    console.log("SignupClear");
    setEmail("");
    setPassword("");
  };

  const handleSignInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    console.log("handleSignInWithGoogle", data, error);
  };

  const handlesignInWithPassword = async () => {
    console.log("handlesignInWithPassword", email, password);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.log("error", error);
    }
    if (data) {
      console.log("handlesignInWithPassword", data, error);
      setRedirect(true);
    }
  };

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
    <Box sx={{ width: "auto", maxWidth: "400px", typography: "body1" }}>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="login" value="1" />
            <Tab label="Sign up" value="2" />
            <Tab label="Trial" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Login
            loginPassword={handlesignInWithPassword}
            loginGoogle={handleSignInWithGoogle}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
        </TabPanel>
        <TabPanel value="2">
          <SignUp
            handleSignup={handleSignup}
            SignupClear={SignupClear}
            password={password}
            setPassword={setPassword}
            email={email}
            setEmail={setEmail}
          />
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
