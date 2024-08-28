import { useEffect, useState } from "react";
import { useCreateOrderMutation } from "../../redux/api/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const PlaceOrder = () => {
  const [order, setOrder] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.shippingAddress, cart.paymentMethod, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      });
      console.log(res);
      navigate(`/order/${res.data?.orders._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Progress Steps Component Placeholder */}

      <div className="container mx-auto mt-8 px-4">
        {cart.cartItems.length === 0 ? (
          <div className="text-center text-lg">Your cart is empty</div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full border">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left bg-gray-100">Image</th>
                  <th className="px-4 py-2 text-left bg-gray-100">Product</th>
                  <th className="px-4 py-2 text-left bg-gray-100">Quantity</th>
                  <th className="px-4 py-2 text-left bg-gray-100">Price</th>
                  <th className="px-4 py-2 text-left bg-gray-100">Total</th>
                </tr>
              </thead>

              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="p-4">{item.name}</td>
                    <td className="p-4">{item.quantity}</td>
                    <td className="p-4">
                      ${parseFloat(item.price).toFixed(2)}
                    </td>
                    <td className="p-4">
                      ${parseFloat(item.quantity * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
          <div className="flex flex-col md:flex-row justify-between">
            <ul className="text-lg mb-5 md:mb-0">
              <li className="mb-4">
                <span className="font-semibold">Items:</span> $
                {parseFloat(cart.itemsPrice).toFixed(2)}
              </li>
              <li className="mb-4">
                <span className="font-semibold">Shipping:</span> $
                {parseFloat(cart.shippingPrice).toFixed(2)}
              </li>
              <li className="mb-4">
                <span className="font-semibold">Tax:</span> $
                {parseFloat(cart.taxPrice).toFixed(2)}
              </li>
              <li className="mb-4">
                <span className="font-semibold">Total:</span> $
                {parseFloat(cart.totalPrice).toFixed(2)}
              </li>
            </ul>

            <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-8">
              <div>
                <h2 className="text-xl font-semibold mb-2">Shipping</h2>
                <p>
                  <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                  {cart.shippingAddress.country}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
                <p>
                  <strong>Method:</strong> {cart.paymentMethod}
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="bg-pink-500 text-white py-3 px-6 rounded-full text-lg w-full mt-4 hover:bg-pink-600 transition"
            onClick={placeOrderHandler}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
