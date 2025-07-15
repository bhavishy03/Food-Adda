// src/components/OrderHistoryCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaTruck, FaReceipt, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Player } from '@lottiefiles/react-lottie-player';


const getStatusStyle = (status) => {
  switch (status.toLowerCase()) {
    case 'delivered':
      return {
        label: 'Delivered',
        color: 'text-green-600',
        icon: <FaCheckCircle />,
      };
    case 'cancelled':
      return {
        label: 'Cancelled',
        color: 'text-red-500',
        icon: <FaTimesCircle />,
      };
    default:
      return {
        label: 'Pending',
        color: 'text-yellow-500',
        icon: <FaClock />,
      };
  }
};

const OrderHistoryCard = ({ order, onCancel }) => {
  const navigate = useNavigate();
  const status = getStatusStyle(order.status);

  return (
    <div className="bg-white dark:bg-[#2a2a2a] text-[#212529] dark:text-white rounded-lg shadow hover:shadow-md transition-all p-5">
      {/* 🧾 Basic Info */}
      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mb-4">
        <p>
          <FaReceipt className="inline mr-2 text-orange-400" />
          <strong>Order ID:</strong> {order._id}
        </p>
        <p>🕒 {new Date(order.date).toLocaleString()}</p>
        <p>
          💳 <strong>Payment:</strong>{' '}
          <span className="capitalize text-[#FF914D]">{order.paymentMethod}</span>
        </p>
        <p>
          <FaMapMarkerAlt className="inline mr-1 text-orange-400" />
          <strong>Delivery:</strong> {order.address}
        </p>
      </div>

      {/* 💰 Total Amount */}
      <div className="flex justify-end mb-2">
        <span className="text-orange-500 font-bold text-lg">
          ₹{order.totalAmount}
        </span>
      </div>

      {/* 🍔 Items */}
      <ul className="list-disc text-sm text-gray-500 dark:text-gray-300 ml-5 mb-4">
        {order.items?.map((item, idx) => (
          <li key={idx}>
            {item.name} × {item.quantity} — ₹{item.price}
          </li>
        ))}
      </ul>


      {/* 📍 Status & Buttons */}
      <div className="flex items-center justify-between mt-4">
        <div className={`flex items-center gap-2 font-semibold ${status.color}`}>
          {status.icon}
          {status.label}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/track-order/${order._id}`)}
            className="bg-[#FF914D] hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-full transition-all"
          >
            Track
          </button>

          {order.status.toLowerCase() === 'pending' && (
            <button
              onClick={() => onCancel(order._id)}
              className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-full transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryCard;
