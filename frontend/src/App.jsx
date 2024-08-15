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

const App = () => {
  return (
    <Router>
      <Wrapper />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/alluser" element={<Alluser />} />
      </Routes>

      {/* Products Routes */}
      <Routes>
        <Route path="/product/create" element={<Create />} />
        <Route path="/product/update" element={<Update />} />
        <Route path="/products" element={<GetallForAdmin />} />
        <Route path="/product/top" element={<Top />} />
        <Route path="/product/trending" element={<Trending />} />
      </Routes>

      <Routes>
        <Route path="/category/create" element={<CreateCate />} />
      </Routes>
    </Router>
  );
};
export default App;
