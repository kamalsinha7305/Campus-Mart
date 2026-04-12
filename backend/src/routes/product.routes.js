import express from "express";
import { createProductSchema } from "../validations/product.validation.js";
import { validate } from "../middlewares/validation.middleware.js";
import auth from "../middlewares/auth.middleware.js";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", auth, validate(createProductSchema), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

export default router;
