import { useGetallProductQuery } from "../../redux/api/productSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cart/cartSlice";
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const { data: Products, isLoading, isError } = useGetallProductQuery();

  useEffect(() => {
    if (Products) {
      setProducts(Products?.Products);
    }
  }, [Products]);

  return (
    <div className="flex flex-wrap gap-6 justify-center items-center p-4">
      {products.map((product) => (
        <Card
          product={product}
          key={product?.id} // Adding a key prop for unique identification
          title={product?.name}
          description={product?.description}
          price={product?.price}
          imageUrl={product?.image}
          id={product?._id}
        />
      ))}
    </div>
  );
};

export default AllProducts;

const Card = ({ id, title, description, price, imageUrl, product }) => {
  return (
    <div
      key={id}
      className="card w-full max-w-xs bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="h-48 w-full bg-gray-200 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div className="p-4 flex flex-col justify-between h-[200px]">
        <div>
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          <p className="text-gray-600 text-sm mt-2">
            {description.split(" ").slice(0, 10).join(" ")}...
          </p>
        </div>
        <div className="mt-4">
          <p className="text-xl font-semibold text-gray-800">${price}</p>
        </div>
      </div>
      <div
        // onClick={() => {
        //   const dispatch = useDispatch();
        //   dispatch(addToCart(...product, product.quantity));
        // }}
        className="flex justify-between items-center p-4 bg-gray-50 border-t"
      >
        <Link to={`/product/checkout/${id}`}>
          <button className="w-full ml-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 py-2 px-4 rounded-lg transition duration-300">
            Buy Now
          </button>
        </Link>
      </div>
    </div>
  );
};
