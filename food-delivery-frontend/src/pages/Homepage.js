// src/pages/Homepage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import foodData from '../data/foodData';
import FoodItem from '../components/FoodItem';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import {
  FaStar,
  FaArrowRight,
  FaTruck,
  FaUsers,
  FaCheckCircle
} from 'react-icons/fa';
import Slider from 'react-slick';
import FloatingCartButton from '../components/FloatingCartButton';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from "../utils/axios";

const Homepage = ({ onAddToCart }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Slider images (public/posters)
  const sliderImages = [
    { src: '/posters/burger.jpg' },
    { src: '/posters/paneer.jpg' },
    { src: '/posters/dessert.jpg' }
  ];
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    arrows: false
  };

  // Category filters (ensure your foodData items have .category field)
  const categories = ['All', 'Biryani', 'Pizza', 'Desserts', 'Vegan'];
  const [activeCategory, setActiveCategory] = useState('All');
  const filteredItems = foodData.filter(item =>
    activeCategory === 'All' ? true : item.category === activeCategory
  );

  // Show up to 8 items after filtering
  const featuredItems = filteredItems.slice(0, 8);

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#1e1e1e] text-[#212529] dark:text-white">
      {/* 🎞️ Poster Slider */}
      <Slider {...sliderSettings} className="mb-10 px-4">
        {sliderImages.map((slide, idx) => (
          <div key={idx} className="relative">
            <img
              src={slide.src}
              alt={`Slide ${idx + 1}`}
              className="w-full h-[300px] object-cover object-center rounded-xl shadow-lg"
            />
          </div>
        ))}
      </Slider>

      {/* 🧭 Category Quick Filters */}
      <div className="flex gap-3 overflow-x-auto px-4 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-4 py-1 rounded-full text-sm font-medium transition
              ${
                activeCategory === cat
                  ? 'bg-[#FF914D] text-white'
                  : 'bg-gray-200 dark:bg-[#2a2a2a] text-gray-700 dark:text-gray-300'
              } hover:bg-[#FF914D] hover:text-white`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🍽️ Hero */}
      <section className="text-center mb-16 px-4">
        <motion.h1
          className="text-5xl font-bold mb-4 text-[#FF914D]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          We Serve the Taste You Love 😋
        </motion.h1>
        <motion.p
          className="text-lg mb-8 text-gray-600 dark:text-gray-300 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Discover delicious meals from top chefs. Order online or enjoy doorstep
          delivery.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/menu')}
          className="bg-[#FF914D] hover:bg-orange-600 text-white px-8 py-3 rounded-full text-lg shadow-lg flex items-center gap-2 mx-auto transition"
        >
          🍽️ Explore Menu <FaArrowRight />
        </motion.button>
      </section>

      {/* 🎉 Rewards Preview */}
      <div className="max-w-md mx-auto mb-12 px-4">
        <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-4 rounded-xl text-white shadow-md text-center">
          🎉 You’ve earned <strong>₹92</strong> in rewards!
          <button
            onClick={() => alert('Redeem feature coming soon!')}
            className="mt-3 bg-white text-orange-600 px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-100 transition"
          >
            Redeem Now
          </button>
        </div>
      </div>

      {/* 🔥 Featured Items */}
      <section className="mb-20 px-4">
        <motion.h2
          className="text-3xl font-bold mb-8 text-[#FF914D] flex items-center gap-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <FaStar /> Popular Dishes
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredItems.map(item => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03 }}
              className="transition-transform duration-300"
            >
             <FoodItem item={item} onAdd={onAddToCart || addToCart} />

            </motion.div>
          ))}
        </div>
      </section>

      {/* 💡 Services */}
      <section className="mb-20 text-center px-4">
        <h2 className="text-2xl font-bold text-[#FF914D] mb-8">
          💡 Why Choose Us
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#2a2a2a] p-6 rounded-xl shadow hover:shadow-md transition">
            <FaTruck className="text-3xl text-orange-400 mb-2 mx-auto" />
            <h3 className="font-semibold text-lg">Fast Delivery</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
              Doorstep delivery within 30 mins.
            </p>
          </div>
          <div className="bg-white dark:bg-[#2a2a2a] p-6 rounded-xl shadow hover:shadow-md transition">
            <FaCheckCircle className="text-3xl text-orange-400 mb-2 mx-auto" />
            <h3 className="font-semibold text-lg">Quality Ingredients</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
              Fresh, hygienic, and chef-approved meals.
            </p>
          </div>
          <div className="bg-white dark:bg-[#2a2a2a] p-6 rounded-xl shadow hover:shadow-md transition">
            <FaUsers className="text-3xl text-orange-400 mb-2 mx-auto" />
            <h3 className="font-semibold text-lg">Loved by Thousands</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
              Trusted by 20,000+ happy foodies.
            </p>
          </div>
        </div>
      </section>

      {/* 💬 Testimonials Preview */}
      <section className="mb-20 px-4">
        <h2 className="text-2xl font-bold text-[#FF914D] mb-6 text-center">
          💬 What Our Customers Say
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="bg-[#f8f9fa] dark:bg-[#2a2a2a] p-5 rounded-lg shadow text-sm">
            <p className="text-gray-700 dark:text-gray-300 italic">
              “FOOD DADDA never fails to impress! The delivery is quick and the
              food tastes like heaven.”
            </p>
            <p className="mt-2 font-semibold text-[#FF914D]">— Rohan, Bhopal</p>
          </div>
          <div className="bg-[#f8f9fa] dark:bg-[#2a2a2a] p-5 rounded-lg shadow text-sm">
            <p className="text-gray-700 dark:text-gray-300 italic">
              “The app is smooth and the UI makes ordering so fun. Loyalty points
              system is super cool!”
            </p>
            <p className="mt-2 font-semibold text-[#FF914D]">
              — Priya, Jabalpur
            </p>
          </div>
        </div>
      </section>

      {/* 📍 Delivery Banner CTA */}
      <section className="text-center bg-[#FF914D] text-white py-10 rounded-xl shadow mb-20 px-4">
        <h2 className="text-2xl font-bold mb-2">Track Your Order Live</h2>
        <p className="text-sm mb-4">
          Stay updated with real-time delivery tracking and notifications.
        </p>
        <button
          onClick={() => navigate('/orders')}
          className="bg-white text-[#FF914D] hover:bg-orange-100 px-6 py-2 rounded-full font-semibold transition"
        >
          Go to My Orders
        </button>
      </section>

      {/* 🛒 Floating Cart Shortcut */}
      <FloatingCartButton />
    </div>
  );
};

export default Homepage;
