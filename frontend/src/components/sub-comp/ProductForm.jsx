import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  useUploadImageMutation,
  useCreateProductMutation,
} from "../../redux/api/productSlice";

const ProductForm = ({ categories }) => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [uploadImage] = useUploadImageMutation();
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleImageUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      const res = await uploadImage(formData);
      setImage(res.data.image);
      toast.success(res.data?.message || "Image upload successful");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Image upload failed");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("image", image);
      formdata.append("name", name);
      formdata.append("brand", brand);
      formdata.append("quantity", quantity);
      formdata.append("category", category);
      formdata.append("price", price);
      formdata.append("description", description);

      const res = await createProduct(formdata);
      console.log(res);
      toast.success(res.data?.message || "Product created successfully");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message || error.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <ToastContainer />
      <form
        method="POST"
        encType="multipart/form-data"
        onSubmit={submitHandler}
      >
        {/* Image Upload */}
        <div className="mb-4">
          {image ? (
            <div className="Preview flex justify-center items-center h-[100px] w-[100px] rounded object-cover object-center ">
              <img src={image} alt={image} className="h-full w-full" />
            </div>
          ) : (
            ""
          )}
          <label className="block text-gray-700 font-bold mb-2">
            Product Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-900 border border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2"
          />
        </div>

        {/* Name and Brand */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Product Name
            </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Brand</label>
            <input
              onChange={(e) => setBrand(e.target.value)}
              type="text"
              placeholder="Enter brand name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Quantity, Category, and Price */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Quantity
            </label>
            <input
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Category
            </label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option value={c._id} key={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Price</label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="Enter price"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            rows="4"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 cursor-pointer transition duration-300"
          >
            {isLoading ? "Creating..." : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
