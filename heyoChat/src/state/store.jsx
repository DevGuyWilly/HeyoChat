import {configureStore}from "@reduxjs/toolkit"
import { userSliceReducer } from "./index"
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig ={key:"root",storage,version:1}
const persistedReducer = persistReducer(persistConfig, userSliceReducer);

export const store = configureStore({
  reducer: persistReducer,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});