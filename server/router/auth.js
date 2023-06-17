import express from 'express'


import  bodyParser from "body-parser";
import {testing,signUp,signIn,refresh,logOut} from "../controllers/auth.js"
import { verifyUser } from '../middleware/auth.js';

const authRouter = express.Router();
authRouter.use(bodyParser.urlencoded({ extended: true }));

authRouter.get("/n",verifyUser ,testing);
authRouter.post("/register", signUp);
authRouter.post("/login", signIn);
authRouter.get("/refresh", refresh);
authRouter.get("/logout", logOut);

export default authRouter;
