import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes.js";
import productRoute from "./routes/product.routers.js";
import adminRoute from "./routes/admin.routes.js";
import catagoryRoute from "./routes/catagory.routes.js";
import orderRoute from "./routes/order.routes.js";
import { connectDB } from "./utils/connectDB.js";
import uploadRoute from "./routes/upload.routes.js";

const app = express();

// CORS setup
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", ["DELETE"]],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");

// Connect to the database
connectDB();

// API routes
app.use("/user", userRoute);
app.use("/products", productRoute);
app.use("/admin", adminRoute);
app.use("/category", catagoryRoute);
app.use("/order", orderRoute);
app.use("/uploads", uploadRoute);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const RunningPORT = process.env.PORT || 3000;
app.listen(RunningPORT, () => {
  console.log("application is running on port " + RunningPORT);
});
