import Axios from "axios";

const BASE_URL = "http://localhost:8000";

export const axios = Axios.create({
  baseURL:BASE_URL
}) 
