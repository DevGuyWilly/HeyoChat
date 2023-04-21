import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const PrivateRoute = () => {
  const [user, setUser] = useState(false);

  const getUser = () => {
    axios
      .get("/user/", {
        method: "GET",
        credentials: "include",
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((resObj) => {
        if (resObj) {
          console.log("User Details--->", resObj.user);
          setUser(resObj.user);
          console.log({ user });
        } else {
          throw new Error("Auth Failed");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log(user);

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
