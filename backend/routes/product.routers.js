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
} from "../controllers/products.controllers.js";
const router = express.Router();
router.route("/").post(formidable(), createProduct).get(GetAllProducts);
router
  .route("/:id")
  .put(formidable(), updateProduct)
  .patch(deleteProduct)
  .get(getProduct);

router.get("/top-products", GetTopProducts);
router.get("/trending", GetTrendingProducts);

export default router;
