import product from "../models/product.models.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createProduct = asyncHandler(async (req, res) => {
  try {
    const { name, image, brand, quantity, category, price, description } =
      req.fields;

    switch (true) {
      case !name:
        return res.json({
          error: "name is required",
        });
      case !image:
        return res.json({
          error: "image is required",
        });
      case !brand:
        return res.json({
          error: "brand is required",
        });
      case !quantity:
        return res.json({
          error: "quantity is required",
        });
      case !category:
        return res.json({
          error: "category is required",
        });
      case !price:
        return res.json({
          error: "price is required",
        });
      case !description:
        return res.json({
          error: "description is required",
        });
    }

    const newProduct = await product.create({ ...req.fields });
    res.status(400).json({
      newProduct,
    });
  } catch (error) {
    if (error.name === "CastError") {
      res.json({
        message: "you need to give object id ",
      });
    }
    res.json({
      message: "unable to create product",
      error,
      status: 400,
    });
  }
});
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, image, brand, quantity, category, price, description } =
    req.fields;
  console.log(name, req.params.id);
  try {
    switch (true) {
      case !name:
        return res.json({
          error: "name is required",
        });
      case !image:
        return res.json({
          error: "image is required",
        });
      case !brand:
        return res.json({
          error: "brand is required",
        });
      case !quantity:
        return res.json({
          error: "quantity is required",
        });
      case !category:
        return res.json({
          error: "category is required",
        });
      case !price:
        return res.json({
          error: "price is required",
        });
      case !description:
        return res.json({
          error: "description is required",
        });
    }

    const Product = await product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );
    await Product.save();

    return res.status(201).json({
      success: true,
      message: "successfully updated product",
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: "failed to  updated product",
      error,
    });
  }
});
export const deleteProduct = asyncHandler(async (req, res) => {
  const Product = await product.findById(req.params.id);

  if (!Product) {
    res.json({
      success: false,
      status: 404,
      message: "product not found",
    });
  }

  const deletedProduct = await product.findByIdAndDelete(req.params.id);
  return res.json({
    success: true,
    status: 200,
    message: "product deleted",
  });
});
export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const Product = await product.findById(id);
  if (!Product) {
    return res.status(404).json({
      success: false,
      message: "unable to find product",
    });
  }
  res.json({
    success: true,
    message: "product find successfuly",
    status: 201,
    Product,
  });
});
export const GetAllProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};
    const count = await product.countDocuments({ ...keyword });
    const Products = await product.find({ ...keyword }).limit(pageSize);

    return res.json({
      Products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "unable to fetch products",
      error,
    });
  }
});
export const GetTopProducts = asyncHandler(async (req, res) => {
  try {
    const Products = await product.find({}).sort({ rating: -1 }).limit(4);
    if (!Products) {
      return res.status(404).json({
        message: "unablet to find products",
        success: false,
      });
    }
    res.json({
      success: true,
      message: "successfully fetched products",
      status: 400,
      Products,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "unable to fetch products",
      error,
    });
  }
});
export const GetTrendingProducts = asyncHandler(async (req, res) => {
  try {
    const Products = await product.find({}).sort({ createdAt: -1 }).limit(4);
    if (!Products) {
      return res.status(404).json({
        message: "unablet to find products",
        success: false,
      });
    }
    res.json({
      success: true,
      message: "successfully fetched products",
      status: 400,
      Products,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "unable to fetch products",
      error,
    });
  }
});
export const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const Product = await product.findById(req.params.id);
    if (Product) {
      const alreadyReviewed = Product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      Product.reviews.push(review);
      Product.numReviews = Product.reviews.length;
      Product.rating =
        Product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        Product.reviews.length;
      await Product.save();
      res.status(201).json({ message: "review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "unable to add review",
      error,
    });
  }
});
export const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const Products = await product.find(args);
    res.json({
      Products,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 400,
      message: "internal server error",
      success: false,
    });
  }
});
