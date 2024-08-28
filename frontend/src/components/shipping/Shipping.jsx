import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  savePaymentMethod,
  saveShippingAddress,
} from "../../redux/cart/cartSlice";
import PrograssSteps from "../../components/shipping/ProgressSteps";
const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate(`/placeorder`);
    console.log(cart);
  };
  return (
    <div className="ml-14 max-h-max max-w-full flex-col flex items-center ">
      <PrograssSteps step1 step2 step3 />
      <form method="post" onSubmit={submitHandler}>
        <div className="address flex flex-col p-1">
          <label htmlFor="Address" className="text-xl ">
            Address
          </label>
          <input
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            placeholder="Your Address"
            className="p-1 border border-black rounded w-[20rem]"
          />
        </div>
        <div className="address flex flex-col p-1">
          <label htmlFor="City" className="text-xl ">
            City
          </label>
          <input
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            placeholder="Your City"
            className="p-1 border border-black rounded w-[20rem]"
          />
        </div>
        <div className="address flex flex-col p-1">
          <label htmlFor="Postal code" className="text-xl ">
            Postal Code
          </label>
          <input
            required
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            type="text"
            placeholder="Your Postal Code"
            className="p-1 border border-black rounded w-[20rem]"
          />
        </div>
        <div className="address flex flex-col p-1">
          <label htmlFor="Country" className="text-xl ">
            Country
          </label>
          <input
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            placeholder="Your Country"
            className="p-1 border border-black rounded w-[20rem]"
          />
        </div>
        <div className="payment flax items-center p-2 gap-1">
          <input
            type="radio"
            value={"PayPal"}
            checked={cart.paymentMethod === "PayPal"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="Payment Method">PayPal & Credit Card</label>
        </div>
        <button
          type="submit"
          className="p-2  w-auto rounded bg-gray-600 text-white hover:text-black hover:bg-slate-600 transition-all duration-200 m-1"
        >
          Payment Proceed
        </button>
      </form>
    </div>
  );
};
export default Shipping;
