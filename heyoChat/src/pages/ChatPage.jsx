import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../state";
import { Link } from "react-router-dom";
import background from "../assets/Group550.png";
import {
  Stack,
  Box,
  Paper,
  Avatar,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { Search, MoreVert, Phone, VideoCall } from "@mui/icons-material";

export const ChatPage = () => {
  const [user, setUser] = useState(null);
  const CurrUser = useSelector((state) => state.user);

  const logOut = () => {
    window.open("http://localhost:8000/auth/logout", "_self");
    dispatch(logOut());
  };

  const getUser = async () => {
    const response = await axios.get("/user/", {
      method: "GET",
      credentials: "include",
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.data;
    dispatch(login({ user: data.existingUser }));
  };

  useEffect(() => {
    setUser(CurrUser);
  }, []);

  console.log(user);

  return (
    <div
      style={{
        // margin: "30px",
        // padding: "30px",
        // width: "100vw",
        // border: "2px solid",
        height: " 100%",
        zIndex: "99",
        display: "flex",
        flexDirection: "row",
        // columnGap: "40px",
      }}
    >
      <Stack
        border={"1px solid"}
        sx={{
          width: "35%",
          padding: "15px",
          margin: "20px",
        }}
      ></Stack>
      <Paper
        border={"1px solid red"}
        sx={{
          width: "65%",
          margin: "20px",
          borderRadius: "20px",
          backgroundImage: `url(${background})`,
          // objectFit: "cover",
          position: "relative",
          border: "none",
        }}
        variant={"outlined"}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          // justifyItems = {'center'}
          // border={"1px solid"}
          height={"12%"}
          sx={{
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            backgroundColor: "#FFFFFF",
            boxShadow:
              "0 0 8px 0 rgba(0, 0, 0, 0.2), 0 0 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <Box
            // border={"1px solid red"}
            // justifyItems={"center"}
            justifyContent={"center"}
            sx={{
              display: "flex",
              padding: "10px",
              // width: "500px",
            }}
          >
            <Avatar
              alt="Wilson Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{
                width: 70,
                height: 70,
                // border: "1px solid",
                margin: "auto 0",
              }}
            />
            <Stack
              direction={"column"}
              // border={"1px solid"}
              marginLeft={"10px"}
              justifyContent={"center"}
            >
              <Typography variant="h5">Wilson Dagah</Typography>
              <Typography variant="body2">Online</Typography>
            </Stack>
          </Box>

          <Box
            // border={"1px solid red"}
            justifyContent={"center"}
            // justifyItems={"center"}
            sx={{
              display: "flex",
              margin: "auto 0",
              justifyItems: "center",
              padding: "10px",
              // width: "20%",
              // height : '100%'
            }}
          >
            <Search
              sx={{
                // border: "1px solid",
                width: "50px",
                padding: "5px",
                fontSize: 30,
              }}
            />
            <Phone
              sx={{
                // border: "1px solid",
                width: "50px",
                padding: "5px",
                fontSize: 30,
                color: "#49C4BC",
              }}
            />
            <VideoCall
              sx={{
                // border: "1px solid",
                width: "50px",
                padding: "5px",
                fontSize: 30,
                color: "#49C4BC",
              }}
            />
            <MoreVert
              sx={{
                // border: "1px solid",
                width: "50px",
                padding: "5px",
                fontSize: 30,
              }}
            />
          </Box>
        </Stack>
      </Paper>
    </div>
  );
};

{
  /* <Link to="nextpage"> click</Link>
      <h1 className="chat">This is ChatPage</h1>
      <button onClick={logOut}>LogOut</button> */
}
