import { useFilterProductsQuery } from "../../redux/api/productSlice";
import { useGetallCategoryQuery } from "../../redux/api/categorySlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  setCategories,
  setChecked,
  setProducts,
} from "../../redux/features/shop/shopSlice";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );
  const categoryQuery = useGetallCategoryQuery();
  const filteredProduct = useFilterProductsQuery({
    checked,
    radio,
  });
  const [priceFilter, setPriceFilter] = useState("");
  const [cate, setCate] = useState([]);

  useEffect(() => {
    if (!categoryQuery.isLoading && categoryQuery.data) {
      dispatch(setCategories(categoryQuery.data));
    }
  }, [categoryQuery.data, dispatch]);

  useEffect(() => {
    if (
      filteredProduct.data &&
      !filteredProduct.isLoading &&
      (!checked.length || !radio.length)
    ) {
      const filteredProducts = filteredProduct?.data?.Products.filter(
        (product) => {
          return (
            product.price.toString().includes(priceFilter) ||
            product.price === parseInt(priceFilter, 10)
          );
        }
      );
      dispatch(setProducts(filteredProducts));
    }
  }, [checked, radio, filteredProduct.data, dispatch, priceFilter]);

  useEffect(() => {
    if (categories?.allCategory) {
      setCate(categories?.allCategory);
    }
  }, [categories]);

  const handleBrandClick = (brand) => {
    if (filteredProduct.data) {
      const productByBrand = filteredProduct?.data?.Products.filter(
        (product) => product.brand === brand
      );
      dispatch(setProducts(productByBrand));
    }
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((item) => item !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = filteredProduct?.data
    ? [
        ...Array.from(
          new Set(
            filteredProduct?.data?.Products.map((product) => product.brand)
          )
        ),
      ]
    : [];

  filteredProduct.isLoading ? (
    <div className="loadi">loading.............</div>
  ) : (
    ""
  );
  filteredProduct.isErrror ? (
    <div className="err">someting went wrong .</div>
  ) : (
    ""
  );

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded-md">
          <h2 className="text-lg text-white mb-4">Filter by Categories</h2>
          <div>
            {cate.map((c) => (
              <div key={c._id} className="mb-2">
                <label className="flex items-center text-white">
                  <input
                    type="checkbox"
                    onChange={(e) => handleCheck(e.target.checked, c._id)}
                    className="mr-2"
                  />
                  {c.name}
                </label>
              </div>
            ))}
          </div>

          <h2 className="text-lg text-white mt-6 mb-4">Filter by Brands</h2>
          <div>
            {uniqueBrands?.map((brand) => (
              <label
                key={brand}
                className="flex items-center mb-2 text-white cursor-pointer"
              >
                <input
                  type="radio"
                  name="brand"
                  onChange={() => handleBrandClick(brand)}
                  className="mr-2"
                />
                {brand}
              </label>
            ))}
          </div>

          <h2 className="text-lg text-white mt-6 mb-4">Filter by Price</h2>
          <input
            type="text"
            placeholder="Enter Price"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="w-full px-3 py-2 text-gray-900 rounded-md"
          />
          <button
            className="mt-4 w-full bg-red-500 text-white py-2 rounded-md"
            onClick={() => window.location.reload()}
          >
            Reset
          </button>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-2xl mb-4">{products.length} Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.length === 0 ? (
              <div className="text-center text-gray-500">No products found</div>
            ) : (
              products.map((p) => (
                <Card
                  key={`${Date.now() + Math.round(Math.random)}`}
                  id={p._id}
                  title={p.name}
                  description={p.description}
                  price={p.price}
                  imageUrl={p.image}
                  product={p}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;

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
