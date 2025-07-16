// src/pages/Menu.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFire, FaBell } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import Lottie from 'lottie-react';
import { useCart } from '../context/CartContext';
import loaderAnimation from '../assets/animations/loading-food.json';
import foodData from '../data/foodData';
import FloatingCartButton from '../components/FloatingCartButton';
import 'react-toastify/dist/ReactToastify.css';

const categories = [
  { name: 'All', icon: '🍽️' },
  { name: 'Pizza', icon: '🍕' },
  { name: 'Burger', icon: '🍔' },
  { name: 'Indian', icon: '🍛' },
  { name: 'Desserts', icon: '🍰' },
  { name: 'Beverages', icon: '🥤' },
  { name: 'Pasta', icon: '🍝' },
  { name: 'Sandwich', icon: '🥪' }
];

const trendingKeywords = ['Pizza', 'Biryani', 'Brownie', 'Samosa', 'Cold Coffee'];

export default function Menu() {
  const navigate = useNavigate();
  const { addToCart, getItemCount } = useCart();

  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [focused, setFocused] = useState(false);

  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const [dealTimeLeft, setDealTimeLeft] = useState(0);
  const dealDuration = 2 * 60 * 60 * 1000; // 2 hours
  const dealEnd = useRef(Date.now() + dealDuration);

  // Theme and auth
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    document.body.classList.toggle('dark', saved !== 'light');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) navigate('/login');
  }, [navigate]);

  // Initial loading & count-down
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => {
      const diff = dealEnd.current - Date.now();
      setDealTimeLeft(diff > 0 ? diff : 0);
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  // Autocomplete suggestions
  useEffect(() => {
    if (!search) {
      setSuggestions([]);
      return;
    }
    const matches = foodData
      .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 5)
      .map(item => item.name);
    setSuggestions(matches);
  }, [search]);

  // Filter items
  const filteredItems = foodData.filter(item => {
    const text = `${item.name} ${item.description}`.toLowerCase();
    const matchesText = text.includes(search.toLowerCase());
    const matchesCat = category === 'All' || item.category === category;
    return matchesText && matchesCat;
  });

  // Add to cart
  const handleAdd = item => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`, { autoClose: 1200 });
  };

  // Format deal timer
  const mm = String(Math.floor(dealTimeLeft / 60000)).padStart(2, '0');
  const ss = String(Math.floor((dealTimeLeft % 60000) / 1000)).padStart(2, '0');

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white pb-32">
      <ToastContainer position="top-right" theme="dark" />

      {/* Notify Bell */}
      <motion.div
        className="fixed top-4 right-4 text-2xl text-orange-500 z-20 cursor-pointer"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <FaBell title="Notify me for deals" />
      </motion.div>

      {/* Search Bar */}
      <motion.div
        className="mx-auto mt-6 bg-white dark:bg-gray-800 rounded-full shadow max-w-lg flex items-center px-4"
        initial={{ width: '90%' }}
        animate={{ width: focused ? '100%' : '90%' }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <FaSearch className="text-orange-500 mr-2" />
        <input
          className="flex-1 bg-transparent p-3 focus:outline-none text-sm"
          type="text"
          placeholder="Search for delicious food..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </motion.div>

      {/* Autocomplete */}
      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.ul
            className="mx-auto mt-1 bg-white dark:bg-gray-800 rounded-b-lg shadow max-w-lg text-sm overflow-hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {suggestions.map((sug, idx) => (
              <li
                key={idx}
                onMouseDown={() => setSearch(sug)}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                {sug}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Category Bar */}
      <div className="sticky top-20 z-10 bg-gray-100 dark:bg-gray-900 py-2">
        <div className="mx-auto flex overflow-x-auto gap-3 px-4">
          {categories.map(cat => (
            <motion.button
              key={cat.name}
              onClick={() => setCategory(cat.name)}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-1 whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition ${
                category === cat.name
                  ? 'bg-orange-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Deal Banner */}
      <div className="mx-auto mt-4 max-w-xl bg-gradient-to-r from-orange-400 to-orange-600 rounded-xl text-white text-center p-4 shadow-lg">
        <div className="flex items-center justify-center gap-2 text-lg font-semibold">
          <FaFire className="animate-pulse" />
          Today’s Deal: ₹50 Off on Orders Over ₹300
        </div>
        <div className="mt-1 text-xs">Ends in {mm}:{ss}</div>
      </div>

      {/* Food Grid */}
      <main className="px-4 mt-6">
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="relative">
              <Lottie animationData={loaderAnimation} loop className="w-32 h-32" />
              <div className="absolute inset-0 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse opacity-30" />
            </div>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <div
                key={item.id}
                onClick={() => navigate(`/dish/${item.id}`)}
                className="relative flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer"
              >
                {/* Dish Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover"
                />

                {/* Name & Price */}
                <div className="flex-1 p-3">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-orange-500 font-bold">₹{item.price}</p>
                </div>

                {/* Popular Badge */}
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                  Popular
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={e => {
                    e.stopPropagation();
                    handleAdd(item);
                  }}
                  className="w-full bg-orange-500 text-white font-semibold py-2"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-16">
            <motion.img
              src="/images/no-results.png"
              alt="No results"
              className="mx-auto w-24 mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <p className="text-gray-500">No items found.</p>
            <div className="mt-3 flex justify-center gap-2">
              {trendingKeywords.map((kw, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearch(kw)}
                  className="text-sm text-orange-500 hover:underline"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Floating Cart */}
      <FloatingCartButton />
    </div>
  );
}
