
import { Box, Button, Typography, setRef } from "@mui/material";

import { ArrowForwardOutlined } from "@mui/icons-material";
import FlexBetween from "../components/FlexBetween";
import googleIcon from "../assets/googleIcon.png";
import heyoIcon from "../assets/heyoIcon.svg";
import background from "../assets/Group550.png";
import overlay from "../assets/card41@2x.png";
import { useSelector, useDispatch } from "react-redux";
import {axios} from '../axios/axiosFetch'
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import TextFieldInputComp from "../components/TextFieldInputComp";
import TextFieldPasswordComponent from "../components/TextFieldPasswordComponent";
import { setLogin } from "../state";

export const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state);
  const [email,setEmail]= useState("")
  const [password,setPassword]= useState("")
  // console.log(users);

  const handleChange=(e,setState)=>{
    setState(e.target.value)
  }

  const loginWithGoogle = async (googletoken) => {
    const res = await axios.post("/auth/register", {
      headers: {},
      googleAccessToken: googletoken,
    });
   
    dispatch(setLogin({ user: res.data }));
    navigate("/chatPage");
  };

  const loginG = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      loginWithGoogle(tokenResponse.access_token);
    },
  });
  const Login = async () => {
    const res= await axios.post("/auth/login",{email,password})
    const data =res?.data
    
    dispatch(setLogin({ token: data.accessToken, user: data.formtUser }));
    navigate("/chatPage");
  };
  
  
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
      <div className="main" style={{ height: "450px" }}>
        <img
          src={overlay}
          alt=""
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            // objectFit: "cover",
            top: "0",
            bottom: "0",
            borderRadius: "20px",
          }}
        />
        <form
          style={{
            padding: "30px 0px",
            zIndex: "99",
            marginTop: "35px",
          }}
        >
          <FlexBetween sx={{ padding: "10px" }}>
            <TextFieldInputComp
              label={"Email"}
              handleChange={(e) => handleChange(e, setEmail)}
            />
            <TextFieldPasswordComponent
              label={"Password"}
              handleChange={(e) => handleChange(e, setPassword)}
            />
            <Box
              flexDirection={"column"}
              sx={{ display: "flex", textAlign: "center" }}
            >
              <Typography sx={{ color: "#49C4BC", fontSize: "13px" }}>
                Need help signing in?{" "}
                <a
                  href="#"
                  style={{
                    textDecoration: "none",
                    color: "#49C4BC",
                    fontWeight: "bold",
                  }}
                >
                  Click here
                </a>
              </Typography>
              <Button
                onClick={Login}
                sx={{
                  textAlign: "center",
                  backgroundColor: "#49C4BC",
                  width: "240px",
                  margin: "10px 0",
                  color: "white",
                  borderRadius: "0.29rem",
                  "&:hover": { cursor: "pointer", backgroundColor: "#a7e8e4" },
                }}
              >
                Sign in
              </Button>
              <Box
                sx={{
                  backgroundColor: "#393D41",
                  width: "240px",
                  borderRadius: "8px",
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
                sx={{ color: "#49C4BC", fontSize: "13px", margin: "10px 0" }}
              >
                New to heyo?
                <a
                  href="/signUp"
                  style={{
                    textDecoration: "none",
                    color: "#49C4BC",
                    fontWeight: "bold",
                  }}
                >
                  Sign Up
                </a>
              </Typography>
            </Box>
          </FlexBetween>
        </form>
      </div>
    </div>
  );
};
