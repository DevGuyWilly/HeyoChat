import { axiosPrivate } from "../axios/axiosFetch";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useSelector } from "react-redux";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const {token} = useSelector((state) => state);

  useEffect(() => {
    const requestInterceptors = axiosPrivate.interceptors.request.use(
      config => {
        if (!config?.headers["Authorization"]){
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptors = axiosPrivate.interceptors.response.use(
      (response) => response, // returns the response if everything is good
      async (error) => {
        // if there is an error
        const previousReq = error?.config; //this is used to get the previous sent request stored in the config file
        if (error?.response?.status === 403 && !previousReq.sent) {
          // if statement to check if the response has a status of 403 and the previous request has a value of sent
          previousReq.sent = true; // set to true
          const newAccesstoken = await refresh(); // this returns a new access token
          previousReq.headers["Authorization"] = `Bearer ${newAccesstoken}`; // sets new access token
          return axiosPrivate(previousReq); // makes the request again with then newly generated access token
        }
        return Promise.reject();
      }
    );
    return () => {
      axiosPrivate.interceptors.response.eject(responseInterceptors);
      axiosPrivate.interceptors.request.eject(requestInterceptors);
    };
  }, [token, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
