import {
  FaCartPlus,
  FaHome,
  FaShoppingBag,
  FaHeart,
  FaRegHeart,
  FaUserAlt,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
const Slidebar = () => {
  return (
    <div className="w-12 bg-blue-500 h-screen fixed flex flex-col items-center justify-between text-gray-800 p-2 text-xl">
      <div>
        <div className="flex flex-col gap-8">
          <Link to={"/"}>
            <FaHome />
          </Link>
          <Link to={"/cart"}>
            <FaCartPlus />
          </Link>
          <Link to={"/shopping"}>
            <FaShoppingBag />
          </Link>
          <Link to={"/fevroite"}>
            <FaHeart />
          </Link>
        </div>
      </div>
      <div className="bottom">
        <div className="flex flex-col gap-8">
          <Link to={"/login"}>
            <FiLogOut />
          </Link>
          <Link to={"/profile"}>
            <FaUserAlt />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Slidebar;
