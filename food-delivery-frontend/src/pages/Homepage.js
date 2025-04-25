// src/pages/Homepage.js
import React from 'react';
import foodData from '../data/foodData';
import FoodItem from '../components/FoodItem';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // 
import { useCart } from '../context/CartContext';

const Homepage = ({ onAddToCart }) => {

  const { addToCart } = useCart();
  const navigate = useNavigate();
  const featuredItems = foodData.slice(0, 8); // First 8 items as featured

  return (
    <div className="bg-[#1e1e1e] min-h-screen text-white px-4 py-10">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <motion.h1
          className="text-5xl font-bold mb-4 flex justify-center items-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🍕 Delicious Food Delivered Fast
        </motion.h1>
        <motion.p
          className="text-lg mb-8 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Order your favorite meals from top restaurants near you.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/menu')}
          className="bg-[#FF914D] hover:bg-orange-600 text-white px-8 py-3 rounded-full text-lg shadow-lg transition duration-300"
        >
          🍽️ Explore Menu
        </motion.button>
      </section>

      {/* Featured Items Section */}
      <section>
        <motion.h2
          className="text-3xl font-bold mb-8 flex items-center gap-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          🔥 Featured Items
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featuredItems.map(item => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03 }}
              className="transition-transform duration-300"
            >
              <FoodItem key={item.id} item={item} onAddToCart={onAddToCart} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
