import {Router} from "express";
import {registerUserController, loginController,verifyEmailController,logoutUser} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register",registerUserController);
authRouter.post("/login",loginController);
authRouter.post("/verify-email",verifyEmailController);
authRouter.get("/logoutUser",logoutUser);

export default authRouter;                  
