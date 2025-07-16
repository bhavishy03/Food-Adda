// src/components/FloatingCartButton.jsx
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const FloatingCartButton = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  return (
    <button
      onClick={() => navigate('/cart')}
      className="fixed bottom-6 right-6 bg-[#FF914D] hover:bg-orange-600 text-white p-4 rounded-full shadow-lg z-50 flex items-center gap-2"
      title="Go to Cart"
    >
      <FaShoppingCart className="text-xl" />
      {cartItems.length > 0 && (
        <span className="bg-white text-[#FF914D] text-xs font-bold px-2 py-0.5 rounded-full">
          {cartItems.length}
        </span>
      )}
    </button>
  );
};

export default FloatingCartButton;
