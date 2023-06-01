import {
  Box,
  Button,
  TextField,
  FormLabel,
  useMediaQuery,
  Typography,
  InputBase,
} from "@mui/material";
import { ArrowForwardOutlined } from "@mui/icons-material";
import FlexBetween from "../components/FlexBetween";
import googleIcon from "../assets/googleIcon.png";
import heyoIcon from "../assets/heyoIcon.svg";
import { useSelector ,useDispatch } from "react-redux";
import axios from "axios"
import { login } from "../state";
import { useNavigate } from "react-router-dom";
import {useGoogleLogin} from "@react-oauth/google"

export const SignUp = () => {

  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  console.log(users);
  const navigate = useNavigate()
  // console.log(import.meta.env.VITE_CLIENT_ID);


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
  const googleF = async() => {
    const res = await axios.post("http://localhost:8000/auth",{name:"erons"});
    console.log(res)
    
  

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
      }}
    >
      <img src={heyoIcon} style={{ marginBottom: "40px", height: "60px" }} />
      <div className="main">
        <form>
          <FlexBetween mt="70px">
            <Box display={"flex"} flexDirection={"column"} mb={"17px"}>
              <FormLabel sx={{ color: "#49C4BC", fontSize: "15px" }}>
                Email
              </FormLabel>
              <InputBase
                sx={{
                  padding: "10px",
                  border: "#49C4BC 1px  solid ",
                  width: "240px",
                  height: "30px",
                  borderRadius: "0.29rem",
                  color: "#49C4BC",
                }}
              />
            </Box>
            <Box display={"flex"} flexDirection={"column"} mb={"10px"}>
              <FormLabel sx={{ color: "#49C4BC", fontSize: "15px" }}>
                Password
              </FormLabel>
              <InputBase
                type="password"
                sx={{
                  padding: "10px",
                  border: "#49C4BC 1px  solid ",
                  width: "240px",
                  height: "30px",
                  borderRadius: "0.29rem",
                  color: "#49C4BC",
                }}
              />
            </Box>

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
            {/* regular sign in button  */}
            <Button
              onClick={googleF}
              sx={{
                textAlign: "center",
                backgroundColor: "#49C4BC",
                width: "240px",
                height: "28px",
                color: "white",
                borderRadius: "0.29rem",
                mt: "15px",
                "&:hover": { cursor: "pointer", backgroundColor: "#a7e8e4" },
              }}
            >
              Sign in
            </Button>

            {/* signin with google button */}
            <Box
              sx={{
                backgroundColor: "#393D41",
                width: "240px",
                marginTop: "25px",
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
            <Typography sx={{ color: "#49C4BC", fontSize: "13px", mt: "15px" }}>
              New to heyo?{" "}
              <a
                href="#"
                style={{
                  textDecoration: "none",
                  color: "#49C4BC",
                  fontWeight: "bold",
                }}
              >
                Sign Up
              </a>
            </Typography>
          </FlexBetween>
        </form>
      </div>
    </div>
  );
};
