import express from "express";
import formidable from "express-formidable";
import { IsAdminCheck } from "../middlewares/adminAuth.js";
import { IsAuthenticated } from "../middlewares/authentication.js";
import {
  createProduct,
  deleteProduct,
  GetAllProducts,
  getProduct,
  updateProduct,
  GetTopProducts,
  GetTrendingProducts,
  addProductReview,
  filterProducts,
} from "../controllers/products.controllers.js";

const router = express.Router();
router
  .route("/")
  .post(formidable(), IsAuthenticated, IsAdminCheck, createProduct)
  .get(GetAllProducts);
router
  .route("/:id")
  .put(formidable(), IsAuthenticated, IsAdminCheck, updateProduct)
  .patch(IsAuthenticated, IsAdminCheck, deleteProduct)
  .get(getProduct);

router.get("/top-products", GetTopProducts);
router.get("/trending", GetTrendingProducts);
router.post("/add-review", addProductReview);
router.post("/filter", filterProducts);

export default router;
