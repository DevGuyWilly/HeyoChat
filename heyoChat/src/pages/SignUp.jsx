import { Box, Button, Typography } from "@mui/material";
import { ArrowForwardOutlined } from "@mui/icons-material";
import FlexBetween from "../components/FlexBetween";
import googleIcon from "../assets/googleIcon.png";
import heyoIcon from "../assets/heyoIcon.svg";
import background from "../assets/Group550.png";
import overlay from "../assets/card41@2x.png";
import { useSelector, useDispatch } from "react-redux";
import { axios } from "../axios/axiosFetch";
import { login } from "../state";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import * as yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import TextFieldInputComp from "../components/TextFieldInputComp";
import TextFieldPasswordComponent from "../components/TextFieldPasswordComponent";

const registerSchema = yup.object().shape({
  email: yup.string().required("Input a value"),
  username: yup.string().required("Input a value"),
  phonenumber: yup.number().required("Input a value"),
  password: yup
    .string()
    .required("Input a value")
    .min(4, "Password is too short")
    .max(9, "Use a password you can remember werey"),
  confirmPassword: yup
    .string()
    .required("Input a value")
    .min(4, "Password is too short")
    .max(9, "Use a password you can remember werey")
    .oneOf([yup.ref("password", "password does not match")]),
});

const initialValuesSignup = {
  email: "",
  username: "",
  phonenumber: 0,
  password: "",
  confirmPassword: "",
};

export const SignUp = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);

  const navigate = useNavigate();
  const loginWithGoogle = async (googletoken) => {
    const res = await axios.post("/auth/register", {
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

  const register = async (values, onSubmitProps) => {
    console.log(values)
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    for(let [key,value] of formData.entries()){
      console.log(key,value)
    }
    
    const res = await axios.post("/auth/register", formData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(res)

  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    register(values,onSubmitProps)
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
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesSignup}
          validationSchema={registerSchema}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            resetForm,
          }) => (
            <form
              onSubmit={handleSubmit}
              style={{
                padding: "30px 0px",
                zIndex: "99",
                marginTop: "40px",
              }}
            >
              <FlexBetween sx={{ padding: "10px" }}>
                <TextFieldInputComp
                  label={"Email"}
                  name="email"
                  type="text"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.email}
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextFieldInputComp
                  label={"Username"}
                  name="username"
                  type="text"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.username}
                  error={Boolean(touched.username) && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
                <TextFieldInputComp
                  label={"Phone Number"}
                  name="phonenumber"
                  type="number"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.phonenumber}
                  error={
                    Boolean(touched.phonenumber) && Boolean(errors.phonenumber)
                  }
                  helperText={touched.phonenumber && errors.phonenumber}
                />
                <TextFieldPasswordComponent
                  label={"Password"}
                  name="password"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.password}
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <TextFieldPasswordComponent
                  label={"Confirm Password"}
                  name="confirmPassword"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.confirmPassword}
                  error={
                    Boolean(touched.confirmPassword) &&
                    Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
                <Box flexDirection={"column"} sx={{ display: "flex" }}>
                  <Button
                    type="submit"
                    sx={{
                      textAlign: "center",
                      backgroundColor: "#49C4BC",
                      width: "240px",
                      color: "white",
                      borderRadius: "0.29rem",
                      "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "#a7e8e4",
                      },
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
                      "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "#5F666D",
                      },
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
          )}
        </Formik>
      </div>
    </div>
  );
};
