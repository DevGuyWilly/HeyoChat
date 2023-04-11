import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const PrivateRoute = () => {
  const [mainuser, setUser] = useState(null);
  
  return (
    <>
      hello
      {/* mainuser ? <Outlet /> : <Navigate to="/" /> */}
    </>
  );
};

export default PrivateRoute;
