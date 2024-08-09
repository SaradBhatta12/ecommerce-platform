import { useEffect } from "react";
import Slidebar from "./sub-comp/Slidebar";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const userinfo = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userinfo) {
      navigate("/login");
    }
  }, [userinfo]);

  return (
    <div>
      <ToastContainer />
      <Slidebar />
    </div>
  );
};
export default Home;
