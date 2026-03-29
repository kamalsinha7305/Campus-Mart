import {Router} from "express";
import {registerUserController, loginController,verifyEmailController} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register",registerUserController);
authRouter.post("/login",loginController);
authRouter.post("/verify-email",verifyEmailController);

export default authRouter;


