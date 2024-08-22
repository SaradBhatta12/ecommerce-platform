import express from "express";
const router = express.Router();
import {
  calculateTotalSale,
  createOrder,
  findOrderById,
  getAllOrders,
  getUserOrder,
  MarkIsOrderDelevered,
  MarkOrderAsPaid,
  totalOrders,
  totalSalesByDate,
} from "../controllers/order.controller.js";
import { IsAdminCheck } from "../middlewares/adminAuth.js";
import { IsAuthenticated } from "../middlewares/authentication.js";

router.route("/create-order").post(IsAuthenticated, createOrder);
router.route("/get-all-orders").get(IsAuthenticated, getAllOrders);
router.route("/get-user-order").get(IsAuthenticated, getUserOrder);
router.route("/total-order").get(IsAuthenticated, totalOrders);
router.route("/total-sale").post(IsAuthenticated, calculateTotalSale);
router.route("/total-sales-bydate").get(IsAuthenticated, totalSalesByDate);
router.route("/find-order").post(IsAuthenticated, findOrderById);
router.route("/update-order").post(IsAuthenticated, MarkOrderAsPaid);
router
  .route("/update-order-delevery")
  .post(IsAuthenticated, MarkIsOrderDelevered);
export default router;
