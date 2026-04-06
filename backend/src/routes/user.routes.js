import {Router} from "express";
import {auth} from "../middleware/auth.middleware.js";
import { getUserProfile ,deleteAccount} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/userProfile",auth,getUserProfile);
userRouter.delete("/deleteAccount",auth,deleteAccount);

export default userRouter;


