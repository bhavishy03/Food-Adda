// src/components/HeroSection.js
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="bg-yellow-100 rounded-xl p-8 text-center shadow-md mb-10">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
        Delicious Food, Delivered Fast 🍕🍔
      </h2>
      <p className="text-lg md:text-xl text-gray-600 mb-6">
        Craving something tasty? We’ve got 100+ dishes to choose from!
      </p>
      <Link
        to="/menu"
        className="inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold transition duration-300"
      >
        Order Now
      </Link>
    </div>
  );
};

export default HeroSection;
