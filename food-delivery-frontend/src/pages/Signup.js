import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      setMessage(res.data.message || "Signup successful!");
      setTimeout(() => navigate("/login"), 2000); // Redirect after signup
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Signup failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#1e1e1e] text-white">
      <div className="p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#FF914D]">
          Sign Up
        </h2>

        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full p-2 bg-[#2a2a2a] rounded"
            onChange={handleChange}
            value={formData.name}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 bg-[#2a2a2a] rounded"
            onChange={handleChange}
            value={formData.email}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 bg-[#2a2a2a] rounded"
            onChange={handleChange}
            value={formData.password}
            required
          />
          <button
            type="submit"
            className="bg-[#FF914D] px-4 py-2 rounded hover:bg-orange-600 w-full"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
