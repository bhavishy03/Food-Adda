import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setMsg(res.data.message || "Reset link sent!");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Failed to send reset email.");
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
        {/* 📧 Icon & Heading */}
        <div className="flex items-center gap-3 mb-4 text-[#FF914D]">
          <FaEnvelopeOpenText size={40} className="drop-shadow-sm hover:scale-110 transition duration-200" />
          <h2 className="text-xl font-bold">Forgot Password?</h2>
        </div>

        <p className="text-sm text-gray-300 mb-4">
          Enter your email address and we’ll send you instructions to reset your password.
        </p>

        {msg && <p className="text-green-500 text-center mb-3">{msg}</p>}
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="w-full p-3 bg-[#1e1e1e] border border-gray-600 rounded focus:outline-none focus:border-[#FF914D]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          />

          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-[#FF914D] hover:bg-orange-600 py-3 px-6 rounded-full font-bold text-white"
          >
            Submit
          </motion.button>
        </form>

        <div className="text-left mt-4">
          <Link
            to="/login"
            className="text-sm text-[#FF914D] hover:underline"
          >
            ← Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
