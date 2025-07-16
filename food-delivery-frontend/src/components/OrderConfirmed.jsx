// src/components/OrderConfirmed.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaCheckCircle,
  FaListUl,
  FaHome,
  FaUser
} from 'react-icons/fa';

const OrderConfirmed = ({ order }) => {
  const navigate = useNavigate();

  // 1️⃣ If no order yet, show a simple loader or placeholder
  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#1e1e1e]">
        <p className="text-gray-600 dark:text-gray-300">Loading order details…</p>
      </div>
    );
  }

  // 2️⃣ Destructure safely with defaults
  const items = order.items || [];
  const total = order.totalAmount || 0;

  // 3️⃣ Animation variant
  const bounce = {
    animate: {
      scale: [1, 1.2, 1],
      transition: { repeat: Infinity, duration: 1.5 }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-[#1e1e1e]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-[#2a2a2a] text-[#212529] dark:text-white p-6 rounded-xl shadow-lg w-full max-w-md"
      >
        <motion.div
          variants={bounce}
          animate="animate"
          className="text-5xl text-green-500 mb-2 flex justify-center"
        >
          <FaCheckCircle />
        </motion.div>

        <h2 className="text-center text-2xl font-bold text-[#FF914D] mb-1">
          Order Confirmed!
        </h2>
        <p className="text-center text-sm text-gray-500 dark:text-gray-300 mb-4">
          Your delicious food is on the way 🚚
        </p>

        {/* 🧾 Order Details */}
        <div className="space-y-4 mb-6">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-lg object-cover shadow"
              />
              <div className="flex-grow">
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {item.quantity} × ₹{item.price}
                </p>
              </div>
              <p className="font-semibold">₹{item.quantity * item.price}</p>
            </div>
          ))}
          <div className="flex justify-between font-semibold border-t pt-2">
            <span>Total Paid:</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* 🔄 Navigation Buttons */}
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/orders')}
            className="flex flex-col items-center text-[#FF914D] hover:text-orange-600"
          >
            <FaListUl className="text-xl mb-1" />
            <span className="text-xs">Orders</span>
          </button>
          <button
            onClick={() => navigate('/menu')}
            className="flex flex-col items-center text-[#FF914D] hover:text-orange-600"
          >
            <FaHome className="text-xl mb-1" />
            <span className="text-xs">Menu</span>
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center text-[#FF914D] hover:text-orange-600"
          >
            <FaUser className="text-xl mb-1" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmed;
