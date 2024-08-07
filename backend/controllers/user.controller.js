import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerHandler = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new Error("Please fill all the fields");
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new Error("User already exist");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  const userid = newUser.id;
  const token = jwt.sign({ userid }, process.env.JWT_SECRET);
  const expiryDate = new Date();
  expiryDate.setTime(expiryDate.getTime() + 30 * 24 * 60 * 60 * 1000);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    expires: expiryDate,
    secure: true,
  });
  return res.status(201).json({
    message: "User created successfully",
    success: true,
  });
});

export const loginHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please fill all the fields");
  }
  const userExist = await User.findOne({ email });
  if (!userExist) {
    throw new Error("User does not exist");
  }
  const isPasswordValid = await bcrypt.compare(password, userExist.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const userid = userExist.id;
  const token = jwt.sign({ userid }, process.env.JWT_SECRET);
  const expiryDate = new Date();
  expiryDate.setTime(expiryDate.getTime() + 30 * 24 * 60 * 60 * 1000);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    expires: expiryDate,
    secure: true,
  });

  return res.status(200).json({
    message: "User logged in successfully",
    success: true,
    user: userExist,
  });
});

export const logoutHandler = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(Date.now()),
  });
  return res.status(200).json({
    message: "User logged out successfully",
    success: true,
  });
});

export const getAllUser = asyncHandler(async (req, res) => {
  const allUsers = await User.find();
  return res.status(200).json({
    message: "Users fetched successfully",
    success: true,
    data: allUsers,
  });
});

export const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const uid = req.user._id;
  const user = await User.findById(uid);

  return res.status(200).json({
    message: "User fetched successfully",
    success: true,
    data: user,
  });
});

export const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const uid = req.user._id;
  const updatedUser = await User.findByIdAndUpdate(
    uid,
    {
      username,
      email,
      password: hashedPassword,
    },
    { new: true }
  );
  return res.status(200).json({
    message: "User updated successfully",
    success: true,
    data: updatedUser,
  });
});

export const deleteUserById = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    throw new Error("You are not authorized to delete user");
  }
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    message: "User deleted successfully",
    success: true,
    data: deletedUser,
  });
});

export const getUserById = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    throw new Error("You are not authorized to get user");
  }
  const user = await User.findById(req.params.id);
  return res.status(200).json({
    message: "User fetched successfully",
    success: true,
    data: user,
  });
});

export const updateUserById = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    throw new Error("You are not authorized to update user");
  }

  const { username, email, password, isAdmin } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      username,
      email,
      password: hashedPassword,
      isAdmin: Boolean(isAdmin),
    },
    { new: true }
  );
  return res.status(200).json({
    message: "User updated successfully",
    success: true,
    data: updatedUser,
  });
});
