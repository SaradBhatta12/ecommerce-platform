import order from "../models/order.models.js";
import product from "../models/product.models.js";
import asyncHandler from "../utils/asyncHandler.js";

const calculatePrice = (items) => {
  const itemsPrice = items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxReate = 0.15;
  const taxPrice = (itemsPrice * taxReate).toFixed(2);
  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice,
    taxPrice,
    totalPrice: (
      Number(itemsPrice) +
      Number(shippingPrice) +
      Number(taxPrice)
    ).toFixed(2),
  };
};
export const createOrder = asyncHandler(async (req, res) => {
  try {
    const { shippingAddress, paymentMethod, orderItems } = req.body;
    const userId = req.user._id;
    const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      calculatePrice(orderItems);

    if (!orderItems || orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    }

    const orders = await order.create({
      user: userId,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      orderItems,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      status: 400,
      message: error.message,
    });
  }
});
export const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await order.find({}).populate("user", "id username");
    res.json({
      success: true,
      status: 401,
      orders,
    });
  } catch (error) {
    console.log(error.message || "internal sever error ");
    res.json({
      success: false,
      status: 400,
      message: error.message,
    });
  }
});
export const getUserOrder = asyncHandler(async (req, res) => {
  try {
    const order = await order.find({ user: req.user._id });
    res.json({
      success: true,
      status: 401,
      order,
    });
  } catch (error) {
    console.log(error.message || "internal sever error ");
  }
});
export const totalOrders = asyncHandler(async (req, res) => {
  try {
    const totalOrders = await order.countDocuments();
    res.json({
      success: true,
      status: 401,
      totalOrders,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      status: 400,
      message: error.message,
    });
  }
});
export const calculateTotalSale = asyncHandler(async (req, res) => {
  try {
    const orders = await order.find();
    const totalsels = order.reduce((acc, item) => acc + item.totalPrice, 0);
    res.json({
      success: true,
      status: 401,
      totalsels,
    });
  } catch (error) {
    console.log(error.message || "internal sever error ");
    res.json({
      success: false,
      status: 400,
      message: error.message,
    });
  }
});
export const totalSalesByDate = asyncHandler(async (req, res) => {
  try {
    const saleByData = await order.aggregate([
      {
        $match: {
          isPaid: true,
        },
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);

    res.json({
      success: true,
      status: 401,
      saleByData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      status: 400,
      message: error.message,
    });
  }
});
export const findOrderById = asyncHandler(async (req, res) => {
  try {
    const SingleOrder = await order
      .findById(req.params.id)
      .populate("user", "username  email");

    if (SingleOrder) {
      res.json({
        success: true,
        status: 200,
        SingleOrder,
      });
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      status: 400,
      message: eror.message || "internal sever error",
    });
  }
});
export const MarkOrderAsPaid = asyncHandler(async (req, res) => {
  try {
    const myOrder = await order.findById(req.params.id);
    if (!myOrder) {
      res.json({
        success: false,
        status: 400,
        message: "unable to find order",
      });
    }
    myOrder.isPaid = true;
    myOrder.paidAt = Date.now();
    myOrder.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updateOrder = await myOrder.save();
    res.json({
      success: true,
      status: 401,
      message: "successfully update",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      status: 404,
      message: error.message || "internal server error ",
    });
  }
});
export const MarkIsOrderDelevered = asyncHandler(async (req, res) => {
  try {
    const myOrder = await order.findById(req.params.id);
    if (!myOrder) {
      res.json({
        success: false,
        status: 400,
        message: "unable to find order",
      });
    }
    myOrder.isDelivered = true;
    myOrder.DeliveredAt = Date.now();
    const updatedOrder = myOrder.save();
    res.json({
      success: true,
      status: 401,
      updatedOrder,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      status: 400,
      message: error.message || "internal server error",
    });
  }
});
