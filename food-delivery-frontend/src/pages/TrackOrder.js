// src/pages/TrackOrder.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaHome,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaReceipt,
} from 'react-icons/fa';
import { Player } from '@lottiefiles/react-lottie-player';
import deliveryAnimation from '../assets/animations/delivery-animation.json';

const TrackOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 🔁 Fetch order
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`https://food-adda-backend.onrender.com/api/orders/${id}`);
        setOrder(res.data.order);
      } catch (err) {
        console.error('❌ Error fetching order:', err);
        setError('Failed to fetch order.');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchOrder();
  }, [id]);

  if (loading)
    return (
      <p className="text-center text-[#FF914D] mt-10 font-medium">
        Loading your order details...
      </p>
    );

  if (error)
    return (
      <p className="text-center text-red-500 mt-10 font-semibold">{error}</p>
    );

  return (
    <div className="min-h-screen bg-white dark:bg-[#1e1e1e] text-[#212529] dark:text-white px-4 py-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-[#FF914D] text-center mb-6">
        📦 Track Your Order
      </h2>

      {/* 🚚 Lottie Animation */}
      <div className="bg-white dark:bg-[#2a2a2a] p-4 rounded-xl shadow-sm flex justify-center mb-6">
        <Player autoplay loop src={deliveryAnimation} style={{ height: 140 }} />
      </div>

      {/* 🧾 Summary Card */}
      <div className="bg-[#f8f9fa] dark:bg-[#2a2a2a] rounded-xl p-4 text-center shadow-sm mb-6">
        <p className="text-[#FF914D] font-semibold text-sm">Tracking Details</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <FaReceipt className="inline mr-1 text-[#FF914D]" />
          Invoice #{order._id?.slice(-6)}
        </p>
        <p className="text-lg font-semibold text-green-500 mt-2">
          Estimated Arrival: 10:32 min
        </p>
      </div>

      {/* 📦 Order Breakdown */}
      <div className="bg-white dark:bg-[#2a2a2a] rounded-lg p-4 shadow-sm mb-6 space-y-2">
        <p className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-orange-400" />
          <strong>Address:</strong> {order.address}
        </p>
        <p className="flex items-center gap-2">
          💳 <strong>Payment:</strong>
          <span className="capitalize text-[#FF914D]">
            {order.paymentMethod}
          </span>
        </p>
        <p className="flex items-center gap-2">
          <FaRupeeSign className="text-green-500" />
          <strong>Total:</strong> ₹{order.totalAmount}
        </p>
      </div>

      {/* 🛍️ Items List */}
      <div className="bg-white dark:bg-[#2a2a2a] p-4 rounded-lg shadow-sm mb-6">
        <p className="text-[#FF914D] font-medium mb-2">🛍️ Ordered Items:</p>
        <ul className="list-disc ml-5 text-sm space-y-1">
          {order.items.map((item, idx) => (
            <li key={idx}>
              {item.name} × {item.quantity} — ₹{item.price}
            </li>
          ))}
        </ul>
      </div>

      {/* 📞 Buttons */}
      <div className="flex gap-3 mb-4">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full text-sm transition">
         Message
        </button>
        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-full text-sm transition">
         Call Driver
        </button>
      </div>

      {/* 🏡 Back Button */}
      <button
        onClick={() => navigate('/')}
        className="w-full bg-[#FF914D] hover:bg-orange-600 text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition"
      >
        <FaHome className="mb-1" />
        Back to Home
      </button>
    </div>
  );
};

export default TrackOrder;
