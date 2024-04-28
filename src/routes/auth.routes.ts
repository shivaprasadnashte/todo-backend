import express,{ Express } from "express";
import { forgotPassword, loginUser, registerUser, resetPassword, verifyEmail } from "../controllers/auth.controllers";

const userRoute= express.Router();

userRoute.post("/register",registerUser)
userRoute.post("/login",loginUser)
userRoute.post("/verify",verifyEmail)
userRoute.post("/forgotpassword",forgotPassword)
userRoute.post("/resetpassword",resetPassword)


export default userRoute;