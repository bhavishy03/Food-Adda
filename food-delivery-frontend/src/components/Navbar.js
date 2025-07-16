// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaHistory,
  FaUserCircle,
  FaUtensils,
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { MdShoppingCartCheckout } from "react-icons/md";
import Lottie from "lottie-react";
import { GiKnifeFork } from 'react-icons/gi';


const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const [user, setUser] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path ? "text-[#FF914D]" : "text-[#212529] dark:text-white";

  return (
    <nav className="bg-white dark:bg-[#1e1e1e] text-[#212529] dark:text-white shadow px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* 🍽️ Logo + Brand */}
       <Link to="/" className="flex items-center gap-2">
  <GiKnifeFork className="text-[#FF914D] text-3xl" />
  <span className="text-2xl font-bold text-[#FF914D]">FOOD</span>
  <span className="text-2xl font-bold text-[#212529] dark:text-white">ADDA</span>
</Link>

        {/* 📱 Mobile Toggle */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden text-xl p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {showMobileMenu ? <FaTimes /> : <FaBars />}
        </button>

        {/* 🖥️ Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-lg">
          <Link to="/menu" className={`flex items-center gap-2 hover:text-[#FF914D] transition ${isActive("/menu")}`}>
            <FaUtensils />
            <span>Menu</span>
          </Link>

          <Link to="/cart" className={`relative flex items-center gap-2 hover:text-[#FF914D] transition ${isActive("/cart")}`}>
            <FaShoppingCart />
            <span>Cart</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-[#FF914D] text-xs text-white rounded-full px-1">
                {cartItems.length}
              </span>
            )}
          </Link>

          {user && (
            <Link to="/orders" className={`flex items-center gap-2 hover:text-[#FF914D] transition ${isActive("/orders")}`}>
              <FaHistory />
              <span>Orders</span>
            </Link>
          )}

          {/* 🌗 Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? <FaSun className="text-[#FF914D]" /> : <FaMoon />}
          </button>

          {/* 👤 Profile or Login */}
          {user ? (
            <div className="flex items-center gap-3">
              {user.profilePicture ? (
                <img
                  src={`http://localhost:5000/uploads/${user.profilePicture}`}
                  alt="Profile"
                  onError={(e) => (e.currentTarget.src = "/default-profile.png")}
                  className="w-8 h-8 rounded-full object-cover border-2 border-[#FF914D] cursor-pointer hover:scale-105 transition"
                  onClick={() => navigate("/profile")}
                />
              ) : (
                <FaUserCircle
                  className="w-8 h-8 text-[#FF914D] cursor-pointer hover:scale-105 transition"
                  onClick={() => navigate("/profile")}
                />
              )}
            
            </div>
          ) : (
            <div className="relative">
              <FaUserCircle
                className="text-xl cursor-pointer hover:text-[#FF914D] transition"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white dark:bg-[#2a2a2a] shadow-lg rounded p-2 w-36 z-50">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm hover:bg-[#FF914D] rounded"
                    onClick={() => setShowDropdown(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 text-sm hover:bg-[#FF914D] rounded"
                    onClick={() => setShowDropdown(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 📱 Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden mt-4 space-y-4 text-lg px-2 pb-4">
          <Link to="/menu" onClick={() => setShowMobileMenu(false)} className={`block hover:text-[#FF914D] transition ${isActive("/menu")}`}>
            <FaUtensils className="inline mr-2" />
            Menu
          </Link>
          <Link to="/cart" onClick={() => setShowMobileMenu(false)} className={`block hover:text-[#FF914D] transition relative ${isActive("/cart")}`}>
            <MdShoppingCartCheckout className="inline mr-2 text-xl" />
            Cart
            {cartItems.length > 0 && (
              <span className="ml-2 bg-[#FF914D] text-xs text-white rounded-full px-1">
                {cartItems.length}
              </span>
            )}
          </Link>
          {user && (
            <Link to="/orders" onClick={() => setShowMobileMenu(false)} className={`block hover:text-[#FF914D] transition ${isActive("/orders")}`}>
              <FaHistory className="inline mr-2" />
              Orders
            </Link>
          )}
          <Link
            to={user ? "/profile" : "/login"}
            onClick={() => setShowMobileMenu(false)}
            className="block hover:text-[#FF914D] transition"
          >
            <FaUserCircle className="inline mr-2" />
            {user ? "Profile" : "Login"}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
