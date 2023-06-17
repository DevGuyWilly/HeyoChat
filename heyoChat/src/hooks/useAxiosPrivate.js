import {  axiosPrivate } from "../axios/axiosFetch"
import {useEffect} from 'react'
import useRefreshToken from "./useRefreshToken"
import { useSelector } from "react-redux"

const useAxiosPrivate = () => {
  const refresh = useRefreshToken()
  const {token} = useSelector((state)=>state)

  useEffect(()=>{
    const requestInterceptors= axiosPrivate.interceptors.request.use(
      config =>{
        if (!config?.headers["Authorization"]){
          config.headers["Authorization"] = `Bearer ${token}`
        }
      }
    )

    const responseInterceptors = axiosPrivate.interceptors.response.use(
      response=>response,
      async(error)=>{
        const previousReq = error?.config
        if(error?.response?.status === 403 && !previousReq.sent){
          previousReq.sent = true
          const newAccesstoken = await refresh()
          previousReq.headers["Authorization"] = `Bearer ${newAccesstoken}`;
          return axiosPrivate(previousReq)
        }
        return Promise.reject()
      }
    )
    return()=>{
      axiosPrivate.interceptors.response.eject(responseInterceptors)
    }

  },[token,refresh])

  return
}

export default useAxiosPrivate