import user from "../models/user.models.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";

export const IsAdminCheck = asyncHandler(async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "You are not authorized to perform this action",
    });
  }
  next();
});
