import { useState, useEffect } from "react";
import "./App.css";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Profile from "./Pages/Profile";
import Termscondition from "./Pages/Termscondition";
import Notification from "./Pages/Notification";
import Myorders from "./Pages/Myorders";
import Wishlist from "./Pages/Wishlist";
import ProductListed from "./Pages/ProductListed";
import ContactUs from "./Pages/ContactUs";
import Home from "./Pages/Home";
import ProductDescription from "./Pages/ProductDescription";
import ProductListing from "./Pages/ProductListing";
import PricingModel from "./Pages/PricingModel";
import Chat from "./Pages/Chat";
import { Toaster } from "react-hot-toast";
import Loader from "./Components/Loder";
import ProductCategory from "./Pages/ProductCategory.jsx"


function App() {

  return (
    <div className="App">
      <Routes>
       <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

         <Route path="/profile" element={<Profile />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/myorders" element={<Myorders />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/productlisted" element={<ProductListed />} />
        <Route path="/termscondition" element={<Termscondition />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/product" element={<ProductDescription />} />
        <Route path="/upload" element={<ProductListing />} />
        <Route path="/price" element={<PricingModel />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/category/:categoryName" element={<ProductCategory />} />

        <Route path="*" element={<Navigate to="/" />} /> 
      </Routes>

      <Toaster position="top-center" />
    </div>
  );
}

export default App;