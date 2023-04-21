import { useState ,useEffect } from "react";
import axios from "axios"
import {useSelector, useDispatch} from "react-redux"
import { login } from "../state";

export const ChatPage = () => {
  const [user, setUser]= useState(null);
  const dispatch = useDispatch()
  const users = useSelector((state) => state.user);
  console.log(users);
  
  const logOut = () => {
    window.open("http://localhost:8000/auth/logout", "_self");
    dispatch(logOut())
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
      dispatch(login({ user:data }));
    };
   
  console.log(users)

  
 

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <h1 className="chat">This is ChatPage</h1>
      <button onClick={logOut}>LogOut</button>
    </div>
  );
};
