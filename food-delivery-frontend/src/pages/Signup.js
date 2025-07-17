import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserPlus } from "react-icons/fa";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
     const res = await axios.post("https://food-adda-backend.onrender.com/api/auth/signup", {
  name: formData.name.trim(),
  email: formData.email.trim().toLowerCase(),
  password: formData.password,
});

      setMessage(res.data.message || "Signup successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Signup failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#1e1e1e] text-white px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-[#2a2a2a] border border-orange-500/30 p-6 rounded-xl shadow-xl w-full max-w-md backdrop-blur-md"
      >
      <div className="flex justify-center items-center mb-3 text-[#FF914D]">
  <FaUserPlus size={48} className="mr-2 drop-shadow-sm" />
  <h2 className="text-2xl font-bold text-[#FF914D]">Sign Up</h2>
</div>

        {message && <p className="text-green-500 text-center mb-3">{message}</p>}
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {["name", "email", "password"].map((field, index) => (
            <motion.input
              key={field}
              type={field === "password" ? "password" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full p-3 bg-[#1e1e1e] border border-gray-600 rounded focus:outline-none focus:border-[#FF914D]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            />
          ))}

          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full bg-[#FF914D] hover:bg-orange-600 py-3 rounded-full font-bold text-white"
          >
            Sign Up
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
