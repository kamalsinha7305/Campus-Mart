import express from "express";
import rateLimit from "express-rate-limit";
import { chatWithAssistant } from "../controllers/chat.controller.js";

const router = express.Router();

const assistantLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: "Too many assistant messages, please try again in a minute",
});

router.post("/assistant", assistantLimiter, chatWithAssistant);

export default router;
