import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../redux/cart/cartSlice";
const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (cartItems) {
      setCart(cartItems?.cartItems);
    }
  }, [cartItems]);
  const handleQuantityChange = (id, newQuantity) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    alert("Proceed to checkout with the items in your cart.");
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {cart.length > 0 ? (
            <div>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-4 border-b"
                >
                  <div className="flex items-center">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-bold">{item.name}</h3>
                      <p className="text-gray-600">Brand: {item.brand}</p>
                      <p className="text-gray-600">
                        Category: {item.category.name}
                      </p>
                      <p className="text-gray-600">Price: ${item.price}</p>
                      <div className="flex items-center mt-2">
                        <label
                          htmlFor={`quantity-${item.id}`}
                          className="text-gray-600 mr-2"
                        >
                          Quantity:
                        </label>
                        <input
                          id={`quantity-${item.id}`}
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value)
                            )
                          }
                          className="p-1 border rounded-lg w-16"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="text-red-500 hover:text-red-700 mb-2"
                    >
                      Remove
                    </button>
                    <p className="text-gray-800 font-bold">
                      Total: ${item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
              <div className="p-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                  Total Price: ${totalPrice.toFixed(2)}
                </h2>
                <button
                  onClick={handleCheckout}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          ) : (
            <p className="p-4 text-gray-600">Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
