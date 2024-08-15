import { useEffect, useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetallCategoryQuery,
} from "../../redux/api/categorySlice";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create = () => {
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();
  const { isLoading: isFetching, isError, data } = useGetallCategoryQuery();

  const [category, setCategory] = useState("");
  const [myData, setMyData] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [user, setUser] = useState(null);
  const auth = useSelector((state) => state.auth?.userInfo?.user);

  useEffect(() => {
    setUser(auth);
  }, [auth]);

  useEffect(() => {
    if (data?.allCategory) {
      setMyData(data.allCategory);
    }
  }, [data]);

  if (user?.isAdmin === false) {
    return (
      <div className="error">You are not authorized to access this page</div>
    );
  }

  if (isFetching) return <div className="loading">loading......</div>;

  if (isError)
    return <div className="error">Error: Something went wrong...</div>;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        console.log(editingCategory);
        // Update existing category
        const res = await updateCategory({
          id: editingCategory._id,
          name: category,
        }).unwrap();
        toast.success(res?.message || "Successfully updated");
        setEditingCategory(null);
      } else {
        // Create new category
        const res = await createCategory({ name: category }).unwrap();
        toast.success(res?.message || "Successfully created");
      }
      e.target.reset();
      setCategory("");
    } catch (err) {
      toast.error(
        err?.data?.message || err?.message || "Internal server error"
      );
    }
  };

  const handleEditClick = (cat) => {
    setEditingCategory(cat);
    setCategory(cat.name);
  };

  const handleDeleteClick = async (id) => {
    try {
      const res = await deleteCategory({ id }).unwrap();
      toast.success(
        res.data?.message || res.message || "Category deleted successfully"
      );
    } catch (err) {
      toast.error(
        err?.data?.message || err?.message || "Failed to delete category"
      );
    }
  };

  return (
    <div className="ml-14">
      <ToastContainer />
      <form method="POST" className="m-4" onSubmit={submitHandler}>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category name"
          className="p-2 border border-black rounded bg-transparent text-black"
        />
        <button
          type="submit"
          className="p-2 bg-blue-600 text-black border border-black rounded hover:bg-white hover:text-black ml-2"
          disabled={isCreating || isUpdating}
        >
          {editingCategory
            ? isUpdating
              ? "Updating..."
              : "Update"
            : isCreating
            ? "Creating..."
            : "Create"}
        </button>
        {editingCategory && (
          <button
            type="button"
            onClick={() => {
              setEditingCategory(null);
              setCategory("");
            }}
            className="p-2 bg-gray-600 text-white border border-black rounded hover:bg-white hover:text-black ml-2"
          >
            Cancel
          </button>
        )}
      </form>
      <div className="categories flex flex-wrap gap-2">
        {myData.map((cat) => (
          <div key={cat._id} className="flex items-center gap-2">
            <div
              className="category w-32 h-10 flex justify-center items-center p-2 text-black bg-blue-500 ml-4 rounded cursor-pointer"
              onClick={() => handleEditClick(cat)}
            >
              {cat.name}
            </div>
            <button
              onClick={() => handleDeleteClick(cat._id)}
              className="p-2 bg-red-600 text-white border border-black rounded hover:bg-red-800"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Create;
