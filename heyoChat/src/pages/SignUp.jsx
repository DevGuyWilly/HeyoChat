import { Box, Button, Typography } from "@mui/material";
import { ArrowForwardOutlined } from "@mui/icons-material";
import FlexBetween from "../components/FlexBetween";
import googleIcon from "../assets/googleIcon.png";
import heyoIcon from "../assets/heyoIcon.svg";
import background from "../assets/Group550.png";
import overlay from "../assets/card41@2x.png";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../state";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

import { useState } from "react";
import TextFieldInputComp from "../components/TextFieldInputComp";
import TextFieldPasswordComponent from "../components/TextFieldPasswordComponent";

export const SignUp = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  // console.log(users);
  const navigate = useNavigate();
  const loginWithGoogle = async (googletoken) => {
    const res = await axios.post("http://localhost:8000/auth/register", {
      headers: {},
      googleAccessToken: googletoken,
    });
    console.log(res);

    dispatch(login({ user: res.data }));
    navigate("/chatPage");
  };

  const loginG = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      loginWithGoogle(tokenResponse.access_token);
    },
  });

  const Login = async () => {};


  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${background})`,
      }}
    >
      <img src={heyoIcon} style={{ marginBottom: "40px", height: "60px" }} />

      <div className="main" style={{ height: "600px" }}>
        <img
          src={overlay}
          alt=""
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            top: "0",
            bottom: "0",
            borderRadius: "20px",
          }}
        />
        <form
          style={{
            padding: "30px 0px",
            zIndex: "99",
            marginTop: "40px",
          }}
        >
          <FlexBetween sx={{ padding: "10px" }}>
            <TextFieldInputComp label={"Email"} />
            <TextFieldInputComp label={"Username"} />
            <TextFieldInputComp label={"Phone Number"} />
            <TextFieldPasswordComponent label={"Password"} />
            <TextFieldPasswordComponent label={"Confirm Password"} />
            <Box flexDirection={"column"} sx={{ display: "flex" }}>
              <Button
                onClick={loginWithGoogle}
                sx={{
                  textAlign: "center",
                  backgroundColor: "#49C4BC",
                  width: "240px",
                  color: "white",
                  borderRadius: "0.29rem",
                  "&:hover": { cursor: "pointer", backgroundColor: "#a7e8e4" },
                }}
              >
                Sign Up
              </Button>
              <Box
                sx={{
                  backgroundColor: "#393D41",
                  width: "240px",
                  borderRadius: "8px",
                  margin: "10px 0px",
                  "&:hover": { cursor: "pointer", backgroundColor: "#5F666D" },
                }}
                onClick={loginG}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    padding: "10px 0",
                  }}
                >
                  <img style={{ height: "17px" }} src={googleIcon} />
                  <Typography sx={{ color: "white", fontSize: "12px" }}>
                    Continue with google instead
                  </Typography>
                  <ArrowForwardOutlined
                    sx={{ color: "white", fontSize: "17px" }}
                  />
                </Box>
              </Box>
              <Typography
                sx={{
                  color: "#49C4BC",
                  fontSize: "13px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Already have an Account?
                <a
                  href="/"
                  style={{
                    textDecoration: "none",
                    color: "#49C4BC",
                    fontWeight: "bold",
                  }}
                >
                  Login
                </a>
              </Typography>
            </Box>

          </FlexBetween>
        </form>
      </div>
    </div>
  );
}