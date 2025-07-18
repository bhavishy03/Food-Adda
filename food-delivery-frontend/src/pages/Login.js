import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await axios.post("https://food-adda-backend.onrender.com/api/auth/login", {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("Login successful!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Login failed. Try again.");
    }
  };

  const theme = darkMode ? "dark" : "light";
  const bg = darkMode ? "bg-[#1e1e1e] text-white" : "bg-white text-gray-800";
  const cardBg = darkMode ? "bg-[#2a2a2a]" : "bg-white border-gray-300";
  const inputBg = darkMode ? "bg-[#1e1e1e]" : "bg-gray-100";
  const borderColor = darkMode ? "border-gray-600" : "border-gray-300";

  return (
    <div className={`min-h-screen flex justify-center items-center px-4 transition-all duration-300 ${bg}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className={`border p-6 rounded-xl shadow-xl w-full max-w-md ${cardBg} ${theme === "dark" ? "border-orange-500/30" : "border-gray-200"}`}
      >
        {/* 🌗 Theme Switch */}
        <div className="flex justify-end mb-4">
          <label className="text-sm flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            {darkMode ? "🌙 Dark" : "☀️ Light"}
          </label>
        </div>

        {/* 🔐 Icon and Heading */}
        <div className="flex items-center gap-3 mb-4 text-[#FF914D]">
          <FaLock size={42} className="drop-shadow-sm hover:scale-110 transition duration-200" />
          <h2 className="text-2xl font-bold">Login to Your Account</h2>
        </div>

        {message && <p className="text-green-500 text-center mb-3">{message}</p>}
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {["email", "password"].map((field, index) => (
            <motion.input
              key={field}
              type={field === "password" ? "password" : "email"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              required
              className={`w-full p-3 ${inputBg} ${borderColor} border rounded focus:outline-none focus:border-[#FF914D]`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            />
          ))}

          <div className="text-right mt-1">
            <Link
              to="/forgot-password"
              className="text-sm text-[#FF914D] hover:text-orange-500 transition duration-200"
            >
              Forgot Password?
            </Link>
          </div>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full bg-[#FF914D] hover:bg-orange-600 py-3 rounded-full font-bold text-white"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
