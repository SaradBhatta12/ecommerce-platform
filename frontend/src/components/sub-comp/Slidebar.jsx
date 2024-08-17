import {
  FaCartPlus,
  FaHome,
  FaShoppingBag,
  FaHeart,
  FaRegHeart,
  FaUserAlt,
} from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
const Slidebar = () => {
  const [dropmenu, setDropmenu] = useState(false);
  return (
    <div className="w-12 bg-blue-500 h-screen fixed left-0 top-0 flex flex-col items-center justify-between text-gray-800 p-2 text-xl">
      <div>
        <div className="flex flex-col gap-8">
          <Link to={"/"}>
            <FaHome />
          </Link>
          <Link to={"/product/cart"}>
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
          {dropmenu ? (
            <div className="menu-list fixed bottom-3 left-12 m-1  bg-gray-600 flex rounded flex-col">
              <Link className="hover:bg-blue-500 cursor-pointer p-2" to={""}>
                Profile
              </Link>
              <Link className="hover:bg-blue-500 cursor-pointer p-2" to={""}>
                Logout
              </Link>
              <Link
                className="hover:bg-blue-500 cursor-pointer p-2"
                to={"/products"}
              >
                All Products
              </Link>
              <Link
                className="hover:bg-blue-500 cursor-pointer p-2"
                to={"/alluser"}
              >
                Alluser
              </Link>
              <Link
                className="hover:bg-blue-500 cursor-pointer p-2"
                to={"/product/create"}
              >
                Product
              </Link>
              <Link
                className="hover:bg-blue-500 cursor-pointer p-2"
                to={"/category/create"}
              >
                Categories
              </Link>
            </div>
          ) : (
            ""
          )}
          <Link onClick={() => setDropmenu(!dropmenu)} className="text-2xl">
            {/* create dropdown menu  */}
            <IoIosArrowDropdown />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Slidebar;
