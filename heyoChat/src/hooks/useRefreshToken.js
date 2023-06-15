import { axios } from "../axios/axiosFetch";
import { setNewToken } from "../state";
import { useDispatch } from "react-redux";

const useRefreshToken=()=>{
  const dispatch = useDispatch()
  const refresh= async()=>{
    const response = await axios.get("/auth/refresh")
    const data = response?.data
    dispatch(setNewToken({token:data.accessToken}))
    return data.accessToken
  }
  
  return refresh
}

export default useRefreshToken