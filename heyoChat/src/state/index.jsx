import { createSlice } from "@reduxjs/toolkit";

const initialState = {user:null,token:null}

const userSlice = createSlice({
  name:"user",
  initialState:initialState,
  reducers:{
    setLogin:(state,action)=>{
      state.token =action.payload.token
      state.user = action.payload.user
    },
    setLogout:(state)=>{
      state.token=null
      state.user = null
    },
    setNewToken:(state,action)=>{
      state.token =action.payload.token
    }
  }
})

export const {setLogin,setLogout,setNewToken}= userSlice.actions
export const userSliceReducer = userSlice.reducer