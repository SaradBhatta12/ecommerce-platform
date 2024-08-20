import order from "../models/order.models.js";
import product from "../models/product.models.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createOrder = asyncHandler(async (req, res) => {
  try {
    const { orderItems, paymentMethod, shippingAddress } = req.body;
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    }
    const ProductFromDb = await product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    const ItemsfromDB = orderItems.map((ItemFromClient) => {
      const matchingItems = ProductFromDb.find((productDB) => {
        productDB._id.toString() === ItemFromClient._id;
      });

      if (!matchingItems) {
        res.status(404);
        throw new Error("no product found" + ItemFromClient._id);
      }

      return {
        ...ItemFromClient,
        Product: ItemFromClient._id,
        price: matchingItems.price,
        _id: undefined,
      };
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
      status: 401,
    });
  }
});
