import express from "express";
import { IsAdminCheck } from "../middlewares/adminAuth.js";
import { IsAuthenticated } from "../middlewares/authentication.js";
import {
  createCatagory,
  getllCatagory,
  updateCatagory,
  deleteCatagory,
  getCategoryById,
} from "../controllers/catagory.controller.js";
const router = express.Router();

router
  .route("/")
  .post(IsAuthenticated, IsAdminCheck, createCatagory)
  .get(IsAuthenticated, IsAdminCheck, getllCatagory);
router
  .route("/:id")
  .put(IsAuthenticated, IsAdminCheck, updateCatagory)
  .patch(IsAuthenticated, IsAdminCheck, deleteCatagory)
  .get(getCategoryById);

export default router;
