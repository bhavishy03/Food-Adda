import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaHistory,
  FaUserCircle,
  FaUtensils,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { GiKnifeFork } from "react-icons/gi";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const theme = localStorage.getItem("theme");
    setDarkMode(theme === "dark");
    document.body.classList.toggle("dark", theme === "dark");
  }, [location]);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.body.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const isActive = (path) =>
    location.pathname === path ? "text-[#FF914D]" : "text-[#212529] dark:text-white";

  return (
    <nav className="bg-white dark:bg-[#1e1e1e] text-[#212529] dark:text-white shadow px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* 🔸 Logo + Theme Toggle */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-1">
            <GiKnifeFork className="text-[#FF914D] text-2xl" />
            <span className="text-xl font-bold text-[#FF914D]">FOOD</span>
            <span className="text-xl font-bold text-[#212529] dark:text-white">ADDA</span>
          </Link>
          <button onClick={toggleTheme} className="text-xl">
  {darkMode ? <FaSun className="text-[#FF914D]" /> : <FaMoon />}
</button>

        </div>

        {/* 🔸 Always Visible Icons */}
        <div className="flex items-center gap-5 text-xl">
          <Link to="/menu" className={`hover:text-[#FF914D] ${isActive("/menu")}`}>
            <FaUtensils />
          </Link>

          {user && (
            <Link to="/orders" className={`hover:text-[#FF914D] ${isActive("/orders")}`}>
              <FaHistory />
            </Link>
          )}

          <Link to="/cart" className={`relative hover:text-[#FF914D] ${isActive("/cart")}`}>
            <FaShoppingCart />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF914D] text-[10px] text-white rounded-full px-1">
                {cartItems.length}
              </span>
            )}
          </Link>

          {user ? (
            user.profilePicture ? (
              <img
                src={`http://localhost:5000/uploads/${user.profilePicture}`}
                alt="Profile"
                onError={(e) => (e.currentTarget.src = "/default-profile.png")}
                className="w-8 h-8 rounded-full object-cover border-2 border-[#FF914D] cursor-pointer hover:scale-105 transition"
                onClick={() => navigate("/profile")}
              />
            ) : (
              <FaUserCircle
                className="text-2xl text-[#FF914D] cursor-pointer hover:scale-105 transition"
                onClick={() => navigate("/profile")}
              />
            )
          ) : (
            <Link to="/login">
              <FaUserCircle className="text-2xl text-[#FF914D] hover:scale-105 transition" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
