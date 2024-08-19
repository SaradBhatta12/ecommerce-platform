import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useGetSingleProductQuery } from "../../redux/api/productSlice";
import { useGetCategoryByIdQuery } from "../../redux/api/categorySlice";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart/cartSlice";
const Checkout = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetSingleProductQuery(id);

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [cate, setCate] = useState({});
  const [cart, setCart] = useState([]);

  const { data: mycategory } = useGetCategoryByIdQuery(product?.category);
  useEffect(() => {
    if (data) {
      setProduct(data?.Product);
    }
  }),
    [data];

  useEffect(() => {
    if (mycategory) {
      setCate(mycategory?.category);
    }
  }),
    [mycategory];

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  // const handleCheckout = () => {
  //   alert("Checkout successful! Implement payment process here.");
  // };

  isLoading ? <div className="loading">loading...........</div> : "";
  isError ? <div className="error">error.............</div> : "";

  return (
    <div className="min-h-screen bg-gray-100 py-10" key={product._id}>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row bg-white shadow-md rounded-lg overflow-hidden">
          <div
            className="lg:w-1/2 h-80 bg-cover bg-center"
            style={{ backgroundImage: `url(${product.image})` }}
          >
            <img src={product.image} alt={product.name} className="rounded" />
          </div>
          <div className="lg:w-1/2 p-6">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-gray-600 mt-4">{product.description}</p>
            <div className="mt-4">
              <span className="text-gray-600 font-semibold">Price: </span>
              <span className="text-xl font-bold">${product.price}</span>
            </div>
            <div className="mt-4">
              <label htmlFor="quantity" className="text-gray-600 font-semibold">
                Quantity:
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="ml-2 p-2 border rounded-lg w-20"
              />
            </div>
            <div className="mt-4">
              <label className="text-gray-600 font-semibold">Brand: </label>
              <span>{product.brand}</span>
            </div>
            <div className="mt-4">
              <label className="text-gray-600 font-semibold">Category: </label>
              <span>{cate.name}</span>
            </div>
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleAddToCart}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Add to Cart
              </button>
              <button
                // onClick={handleCheckout}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
