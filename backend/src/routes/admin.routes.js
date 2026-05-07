import express from "express";
import auth from "../middlewares/auth.middleware.js";
import requireRoles from "../middlewares/role.middleware.js";
import { USER_ROLES } from "../config/constants.js";
import {
  getUsers,
  updateUserStatus,
} from "../controllers/admin.user.controller.js";
import {
  getProducts,
  hardDeleteProduct,
  softDeleteProduct,
  updateProductStatus,
} from "../controllers/admin.product.controller.js";
import {
  adminLogin,
  adminLogout,
  adminMe,
  adminRefreshToken,
} from "../controllers/adminAuth.controller.js";

const router = express.Router();

router.post("/auth/login", adminLogin);
router.post("/auth/refresh-token", adminRefreshToken);

router.use(auth, requireRoles(USER_ROLES.ADMIN, USER_ROLES.SUPPORT));

router.get("/auth/me", adminMe);
router.post("/auth/logout", adminLogout);

router.get("/users", getUsers);
router.patch("/users/:id/status", updateUserStatus);

router.get("/products", getProducts);
router.patch("/products/:id/status", updateProductStatus);
router.patch("/products/:id/soft-delete", softDeleteProduct);
router.delete("/products/:id", hardDeleteProduct);

export default router;
