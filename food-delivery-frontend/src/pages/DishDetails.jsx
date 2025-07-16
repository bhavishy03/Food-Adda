// src/pages/DishDetails.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaArrowLeft,
  FaStar,
  FaRegStar,
  FaHeart,
  FaRegHeart,
  FaUserCircle,
  FaClock,
  FaAppleAlt,
  FaHamburger,
  FaShoppingCart
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import foodData from '../data/foodData';
import { useCart } from '../context/CartContext';

export default function DishDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems, addToCart } = useCart();

  const [dish, setDish] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFav, setIsFav] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);

  useEffect(() => {
    const pick = foodData.find((item) => String(item.id) === id);
    if (pick) {
      setDish(pick);
      const recs = (pick.recommended || [])
        .map((rid) => foodData.find((it) => String(it.id) === rid))
        .filter(Boolean);
      setRecommended(recs);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <span className="text-lg text-gray-600">Loading…</span>
      </div>
    );
  }
  if (!dish) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <span className="text-lg text-red-500">Dish not found.</span>
      </div>
    );
  }

  // Reviews & average
  const revs = dish.reviews || [];
  const avg =
    revs.length > 0
      ? revs.reduce((sum, r) => sum + r.rating, 0) / revs.length
      : 0;

  // Cart total
  const cartTotal = cartItems.reduce(
    (sum, it) => sum + it.price * it.quantity,
    0
  );

  // Handlers
  const handleOrder = () => {
    addToCart({ ...dish, quantity: 1 });
    toast.success(`${dish.name} added to cart!`);
  };

  return (
    <>
      <ToastContainer position="top-right" />
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
        {/* Top Nav */}
        <nav className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 shadow-md">
          <div className="text-xl font-serif">FOOD DADDA</div>
          <ul className="flex items-center space-x-6 text-gray-700 dark:text-gray-200">
            <li onClick={() => navigate('/menu')} className="cursor-pointer hover:underline">
              Menu
            </li>
            <li onClick={() => navigate('/cart')} className="relative cursor-pointer hover:underline">
              <FaShoppingCart />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </li>
            <li onClick={() => navigate('/orders')} className="cursor-pointer hover:underline">
              Orders
            </li>
            <li onClick={() => navigate('/profile')} className="cursor-pointer">
              <FaUserCircle size={20} />
            </li>
          </ul>
        </nav>

     {/* Hero & Controls with Curve + Animations */}
<div className="relative w-full overflow-hidden">

  {/* Animated Card Container */}
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    whileHover={{ scale: 1.03, rotate: 1 }}
    className="mx-4 mt-4 rounded-3xl overflow-hidden shadow-2xl bg-white"
  >
   <img
  src={dish.image}
  alt={dish.name}
  className="w-full h-[300px] object-cover rounded-xl"
/>



    {/* Badge (floats above image) */}
    <motion.div
      className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-sm font-semibold rounded-full shadow-md"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      Chef’s Pick
    </motion.div>

    {/* Back + Favorite Buttons */}
    <div className="absolute top-4 left-4 flex items-center space-x-2">
      <button
        onClick={() => navigate(-1)}
        className="p-2 bg-white rounded-full shadow hover:shadow-lg transition"
      >
        <FaArrowLeft className="text-gray-800" />
      </button>
      <button
        onClick={() => setIsFav((f) => !f)}
        className="p-2 bg-white rounded-full shadow hover:shadow-lg transition"
      >
        {isFav ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-800" />}
      </button>
    </div>
  </motion.div>

  {/* SVG Curve at the Bottom */}
  <svg
    className="absolute bottom-0 left-0 w-full h-12"
    viewBox="0 0 1440 120"
    preserveAspectRatio="none"
  >
    <path
      d="M0,0 C600,120 840,0 1440,120 L1440,180 L0,180 Z"
      fill="white"
    />
  </svg>
</div>


        {/* Content */}
        <div className="flex-1 px-6 py-4 space-y-6">
          {/* Title */}
          <h1 className="text-3xl font-serif text-gray-900 dark:text-white">
            {dish.name}
          </h1>

          {/* Rating & Facts */}
          <div className="flex items-center space-x-4">
            <AnimatePresence>
              <motion.div
                className="flex items-center space-x-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-xl font-semibold text-yellow-400">
                  {avg.toFixed(1)}
                </span>
                <FaStar className="text-yellow-400" />
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  {revs.length} review{revs.length !== 1 && 's'}
                </span>
              </motion.div>
            </AnimatePresence>
            {/* Nutrition / Time */}
            <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
              <div className="flex items-center space-x-1">
                <FaClock />
                <span className="text-sm">20 min</span>
              </div>
              <div className="flex items-center space-x-1">
                <FaAppleAlt />
                <span className="text-sm">250 kcal</span>
              </div>
            </div>
          </div>

          {/* Ingredients Accordion */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
            <button
              onClick={() => setShowIngredients((o) => !o)}
              className="flex justify-between w-full items-center text-gray-800 dark:text-gray-200"
            >
              <span className="font-medium">Ingredients & Description</span>
              <motion.span
                animate={{ rotate: showIngredients ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ▼
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {showIngredients && (
                <motion.div
                  className="pt-4 text-gray-700 dark:text-gray-300"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="leading-relaxed">{dish.description}</p>
                  <ul className="list-disc ml-5 mt-2">
                    {(dish.ingredients || []).map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Customer Reviews Carousel */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
              Customer Reviews
            </h2>
            {revs.length === 0 ? (
              <p className="text-gray-500">No reviews yet.</p>
            ) : (
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {revs.map((r, i) => (
                  <motion.div
                    key={i}
                    className="min-w-[180px] bg-white dark:bg-gray-800 rounded-lg shadow p-4"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <FaUserCircle className="text-2xl text-gray-400" />
                      <div>
                        <div className="font-medium">{r.user}</div>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, j) =>
                            j < r.rating ? (
                              <FaStar key={j} className="text-yellow-400 text-sm" />
                            ) : (
                              <FaRegStar key={j} className="text-gray-400 text-sm" />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                      {r.comment}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Recommended Combos */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
              Recommended Combos
            </h2>
            {recommended.length === 0 ? (
              <p className="text-gray-500">No combos found.</p>
            ) : (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {recommended.map((item) => (
                  <motion.div
                    key={item.id}
                    className="min-w-[140px] bg-white dark:bg-gray-800 rounded-lg shadow p-2 cursor-pointer"
                    whileHover={{ scale: 1.03 }}
                    onClick={() => navigate(`/dish/${item.id}`)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <h3 className="mt-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                      {item.name}
                    </h3>
                    <p className="text-orange-500 font-bold">₹{item.price}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
          <div className="text-lg font-medium text-gray-800 dark:text-gray-200">
            Subtotal: ₹{cartTotal}
          </div>
          <motion.button
            onClick={handleOrder}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden px-6 py-3 rounded-full text-white font-semibold
                       bg-gradient-to-r from-orange-500 to-pink-500 shadow-lg"
          >
            Order Now • ₹{dish.price}
          </motion.button>
        </div>
      </div>
    </>
  );
}
