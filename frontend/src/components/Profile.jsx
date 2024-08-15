import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/api/usersSlice"; // Use the correct mutation hook
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/features/auth/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall, { isLoading, isError, error }] = useLogoutMutation(); // Use mutation

  const logoutHandler = async () => {
    try {
      if (!(localStorage.length == 0)) {
        const result = await logoutApiCall().unwrap();
        dispatch(logout());
        toast.success(result.message); // Assume response has a message field
        navigate("/login");
      }

      toast.success("you already have logged out");
      navigate("/login");
      return;
    } catch (err) {
      console.log(err);
      toast.error(err?.message || err?.data?.message8);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <ToastContainer />
      <button
        onClick={logoutHandler}
        className="p-2 border border-red-500 bg-black text-white rounded"
        disabled={isLoading}
      >
        {isLoading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
};

export default Profile;
