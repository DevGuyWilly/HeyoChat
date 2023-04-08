import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const PrivateRoute = () => {
  const [mainuser, setUser] = useState(null);
  useEffect(() => {
    const getUser = () => {
      axios
        .get("http://localhost:8000/auth/login/sucess", {
          method: "GET",
          // credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          return response.json();
        })
        .then((resObj) => {
          if (resObj.status === "success") {
            setUser(resObj.user);
          } else {
            throw new Error("Auth Failed");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  return mainuser ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
