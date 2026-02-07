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
import { auth } from "./Components/firebase";
import Loader from "./Components/Loder";
import ProductCategory from "./Pages/ProductCategory.jsx"


function App() {
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser || null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (
      user &&
      (location.pathname === "/login" || location.pathname === "/signup")
    ) {
      navigate("/");
    }
  }, [user, location.pathname, navigate]);

  if (user === undefined) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
        <Loader />
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/notification"
          element={user ? <Notification /> : <Navigate to="/login" />}
        />
        <Route
          path="/myorders"
          element={user ? <Myorders /> : <Navigate to="/login" />}
        />
        <Route
          path="/wishlist"
          element={user ? <Wishlist /> : <Navigate to="/login" />}
        />
        <Route
          path="/productlisted"
          element={user ? <ProductListed /> : <Navigate to="/login" />}
        />
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