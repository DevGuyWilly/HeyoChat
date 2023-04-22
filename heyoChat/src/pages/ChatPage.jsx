import { useState ,useEffect } from "react";
import axios from "axios"
import {useSelector, useDispatch} from "react-redux"
import { login } from "../state";
import { Link } from "react-router-dom";

export const ChatPage = () => {
  const [user, setUser]= useState(null);
  
  
  const logOut = () => {
    window.open("http://localhost:8000/auth/logout", "_self");
    dispatch(logOut())
  };

  const getUser = async () => {
      
    };
   
 

  
 

  useEffect(() => {
    // getUser();
  }, []);

  return (
    <div>
      <Link to="nextpage"> click</Link>
      <h1 className="chat">This is ChatPage</h1>
      <button onClick={logOut}>LogOut</button>
    </div>
  );
};
