import express from "express";

import auth from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";

import {
  reportProductSchema,
  reportUserSchema,
} from "../validations/report.validation.js";

import { reportProduct, reportUser } from "../controllers/report.controller.js";

const router = express.Router();

router.post(
  "/product/:productId",
  auth,
  validate(reportProductSchema),
  reportProduct,
);

router.post("/user/:userId", auth, validate(reportUserSchema), reportUser);

export default router;
