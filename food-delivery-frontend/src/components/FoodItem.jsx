// src/components/FoodItem.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const FoodItem = ({ item }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(item);
  };

  const handleBuyNow = () => {
    addToCart(item);
    navigate('/cart');
  };

  return (
    <div className="border rounded-lg p-4 shadow-md bg-[#1e1e1e] text-white">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-xl font-semibold text-[#FF914D] mb-2">
        {item.name}
      </h3>
      <p className="text-gray-300 mb-4">{item.description}</p>
      <p className="font-semibold mt-1">₹{item.price}</p>

      {/* Buttons */}
      <div className="flex gap-2 mt-2">
        <button
          onClick={handleAddToCart}
          className="bg-[#FF914D] text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="bg-white text-[#FF914D] px-4 py-2 rounded hover:bg-orange-100 font-semibold"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default FoodItem;
