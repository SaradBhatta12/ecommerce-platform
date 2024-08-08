import asyncHandler from "../utils/asyncHandler.js";
import catagory from "../models/ctatagories.models.js";

export const createCatagory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.json({
      status: 404,
      success: false,
      message: "required name field",
    });
    return;
  }

  const existCatagory = await catagory.findOne({ name });
  if (existCatagory) {
    res.json({
      status: 402,
      success: false,
      message: "category already exist. try with another name",
    });
    return;
  }

  const newCategory = await catagory.create({ name });
  return res.json({
    status: 200,
    success: true,
    message: "category successfully cerated ",
    newCategory,
  });
});

export const updateCatagory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const updatedCategory = await catagory.findByIdAndUpdate(id, {
    name: name,
  });

  res.json({
    status: 200,
    success: true,
    message: "successfully updated..",
  });
});

export const deleteCatagory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const categoryExist = await catagory.findById(id);
  if (!categoryExist) {
    return res.json({
      status: 404,
      success: true,
      message: "category not exist",
    });
  }
  const deletedCatagory = await catagory.findByIdAndDelete(id, {
    name: name,
  });

  res.json({
    status: 200,
    success: true,
    message: "successfully deleted..",
  });
});

export const getllCatagory = asyncHandler(async (req, res) => {
  const allCategory = await catagory.find();
  return res.json({
    success: true,
    status: 200,
    message: "successfully fetched all category",
    allCategory,
  });
});
