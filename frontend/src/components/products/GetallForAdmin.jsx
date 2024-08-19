import { useState, useEffect } from "react";
import { useGetallProductQuery } from "../../redux/api/productSlice";
import { Link } from "react-router-dom";
const GetallForAdmin = () => {
  const [products, setProducts] = useState([]);
  const { data, isLoading, isError, error } = useGetallProductQuery();

  // Place useEffect here to avoid breaking hook order
  useEffect(() => {
    if (data && data.Products) {
      setProducts(data.Products);
    }
  }, [data]);

  // Handle early returns after all hooks are called
  if (isLoading) return <div className="loading">loading............</div>;
  if (isError)
    return <div className="error">{error?.message || "An error occurred"}</div>;

  return (
    <div className="grid grid-cols-2 p-2 gap-4 ml-14">
      {products.map((product) => (
        <Link to={`/product/${product._id}`} key={product.id}>
          <div className="product flex flex-col md:flex-row gap-4 p-4 border border-gray-300 rounded-lg shadow-md">
            <div className="image h-[12rem] md:h-[7rem] w-full md:w-[7rem] overflow-hidden rounded-lg">
              <img
                src={product.image || "fallback-image-url.jpg"}
                alt={product.name}
                className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="rightsec flex flex-col justify-between flex-1">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {product.name || "No Name"}
                </h1>
                <p className="text-[1rem] text-gray-600 mt-2">
                  {product.description || "No Description"}
                </p>
              </div>
              <div className="flex gap-4 mt-4 text-sm font-bold text-gray-700">
                <div className="price">Price: {product.price || "N/A"}</div>
                <div className="stock">Brand: {product.brand || "N/A"}</div>
                <div className="category">
                  Quantity: {product.quantity || "N/A"}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GetallForAdmin;
