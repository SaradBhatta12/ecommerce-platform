import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Alluser from "./components/Alluser";
import Create from "./components/products/Create";
import Update from "./components/products/Update";
import Top from "./components/products/Top";
import Trending from "./components/products/Trending";
import CreateCate from "./components/category/Createcate";
import GetallForAdmin from "./components/products/GetallForAdmin";
import Wrapper from "./components/Wrapper";
import AllProducts from "./components/products/AllProducts";
import Checkout from "./components/products/Checkout";
import Cart from "./components/products/Cart";
import CheckOutMain from "./components/products/CheckOutMain";
import Shop from "./components/shop/Shop";
import Test from "./components/shop/Test";
import Shipping from "./components/shipping/Shipping";

const App = () => {
  return (
    <Router>
      <Wrapper />
      <Routes>
        <Route path="/" element={<AllProducts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/alluser" element={<Alluser />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>

      {/* Products Routes */}
      <Routes>
        <Route path="/product/create" element={<Create />} />
        <Route path="/product/:id" element={<Update />} />
        <Route path="/test" element={<Test />} />
        <Route path="/product/checkout/:id" element={<Checkout />} />
        <Route path="/product/cart" element={<Cart />} />
        <Route path="/products" element={<GetallForAdmin />} />
        <Route path="/product/top" element={<Top />} />
        <Route path="/product/trending" element={<Trending />} />
        <Route path="/product/checkoutmain" element={<CheckOutMain />} />
      </Routes>

      <Routes>
        <Route path="/category/create" element={<CreateCate />} />
      </Routes>

      {/* routes for order */}
      <Routes>
        <Route path="/shipping" element={<Shipping />} />
      </Routes>
    </Router>
  );
};
export default App;
