// src/pages/FoodDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import foodData from '../data/foodData';
import FoodItem from '../components/FoodItem';
import { useCart } from '../context/CartContext';


const FoodDetail = ({ onAddToCart }) => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const food = foodData.find(item => item.id.toString() === id);

  const recommended = foodData.filter(item => item.id.toString() !== id).slice(0, 4); // 4 random recommendations

  if (!food) return <div className="text-white p-4">Food not found!</div>;

  return (
    <div className="bg-[#1e1e1e] min-h-screen text-white px-4 py-8">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
        <img src={food.image} alt={food.name} className="w-full md:w-1/2 rounded-lg object-cover" />

        <div>
          <h1 className="text-3xl font-bold text-[#FF914D] mb-2">{food.name}</h1>
          <p className="text-gray-300 mb-4">{food.description}</p>
          <p className="text-xl font-semibold mb-4">₹{food.price}</p>
          <button
            onClick={() => onAddToCart(food)}
            className="bg-[#FF914D] text-white px-6 py-2 rounded hover:bg-orange-600"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Recommended Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">🍽️ You may also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {recommended.map(item => (
            <FoodItem key={item.id} item={item} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;
