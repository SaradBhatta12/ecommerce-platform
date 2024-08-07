import express from "express";
import {
  registerHandler,
  loginHandler,
  logoutHandler,
  getAllUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/user.controller.js";

import { IsAuthenticated } from "../middlewares/authentication.js";
import { IsAdminCheck } from "../middlewares/adminAuth.js";

const router = express.Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.post("/logout", IsAuthenticated, logoutHandler);
router.get("/alluser", IsAuthenticated, IsAdminCheck, getAllUser);
router.get("/profile", IsAuthenticated, getCurrentUserProfile);
router.put("/profile", IsAuthenticated, updateCurrentUserProfile);
router.delete("/:id", IsAuthenticated, IsAdminCheck, deleteUserById);
router.get("/:id", IsAuthenticated, IsAdminCheck, getUserById);
router.put("/:id", IsAuthenticated, IsAdminCheck, updateUserById);

export default router;
