import mongoose, { Schema } from "mongoose";

const catagorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxLength: 32,
    },
  },
  {
    timestamps: true,
  }
);

const catagory = mongoose.model("catagory", catagorySchema);
export default catagory;
