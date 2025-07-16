// src/pages/OrderHistory.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderHistoryCard from '../components/OrderHistoryCard';
import { FaHome, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import loaderAnimation from '../assets/animations/loading-food.json';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ⛳️ Load userId from localStorage
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user?._id;

  // 🌗 Dark mode persistence
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || !savedTheme) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);

  // 🔐 Auth check
  useEffect(() => {
    if (!userId) navigate('/login');
  }, [navigate, userId]);

  // 🔁 Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/user/${userId}`);
        setOrders(res.data.orders.reverse());
      } catch (err) {
        console.error('❌ Error fetching orders:', err);
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchOrders();
  }, [userId]);

  // ❌ Cancel order handler
  const handleCancelOrder = async (orderId) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/cancel/${orderId}`);
      setOrders(prev =>
        prev.map(order =>
          order._id === orderId ? { ...order, status: 'Cancelled' } : order
        )
      );
    } catch (err) {
      console.error('❌ Error canceling order:', err);
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-6 bg-[#f8f9fa] dark:bg-[#1e1e1e] text-[#212529] dark:text-white transition">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#FF914D] mb-6 text-center">
        🧾 Your Order History
      </h2>

      {/* 🧭 Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-3 mb-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-center gap-2 bg-[#FF914D] hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-full shadow transition"
        >
          <FaHome className="text-base" />
          <span className="hidden sm:inline">Home</span>
        </button>

        <button
          onClick={() => navigate('/profile')}
          className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded-full shadow transition"
        >
          <FaUserCircle className="text-base" />
          <span className="hidden sm:inline">Profile</span>
        </button>
      </div>

      {/* 🔄 Loader or Orders */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Lottie animationData={loaderAnimation} loop className="w-28 h-28" />
        </div>
      ) : error ? (
        <p className="text-center text-red-500 mt-6">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-400 mt-6">📭 No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderHistoryCard
              key={order._id}
              order={order}
              onCancelOrder={handleCancelOrder}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
