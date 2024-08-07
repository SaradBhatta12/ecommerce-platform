import mongoose from "mongoose";

export const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "ecommerce",
    })
    .then(() => {
      console.log("connection succssfully");
    })
    .catch((err) => {
      console.log("unable to connect to db" + err);
    });
};
