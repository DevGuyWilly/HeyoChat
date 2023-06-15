import Axios from "axios";

const BASE_URL = "http://localhost:8000";

export const axios = Axios.create({
  baseURL:BASE_URL,
  withCredentials:true,
  
}) 


export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});