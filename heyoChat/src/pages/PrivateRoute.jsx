import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const PrivateRoute = () => {
  const [user, setUser] = useState("");
 

  const getUser = async () => {
    const response = await axios
      .get("/user/", {
        method: "GET",
        credentials: "include",
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.data
    
      setUser("hello")

      
  };
  

  console.log(user)

  useEffect(() => {
    // getUser();
  }, []);

  

  // return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
