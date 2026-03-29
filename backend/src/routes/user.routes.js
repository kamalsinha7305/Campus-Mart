import {Router} from "express";
import {registerUserController, loginController} from "../controllers/auth.controller.js";

const userRouter = Router();

userRouter.post("/request-verification",registerUserController);
userRouter.post("",loginController);

export default userRouter;


