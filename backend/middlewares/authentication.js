import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";

export const IsAuthenticated = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  // Log the token to debug
  if (!token) {
    return res.status(401).json({
      success: false,
      status: 401,
      message: "No token provided, authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const uid = decoded.userId;

    // Log the decoded token to debug
    const user = await User.findById(uid);
    if (!user) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error verifying token: ", error);
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Internal server error",
    });
  }
});
