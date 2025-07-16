// src/components/FoodItem.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlusCircle, FaStar, FaRegStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const hoverVariants = {
  rest: { scale: 1, boxShadow: '0px 4px 12px rgba(0,0,0,0.05)' },
  hover: { scale: 1.03, boxShadow: '0px 12px 24px rgba(0,0,0,0.15)' }
};

const tapVariants = {
  pressed: { scale: 0.97 }
};

const FoodItem = ({ item, onAdd }) => {
  const [isHovered, setHovered] = useState(false);
  const itemId = item.id || item._id;

  // Calculate average rating (0–5)
  const reviews = item.reviews || [];
  const avgRating =
    reviews.length
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <motion.div
      className="relative bg-white dark:bg-[#2a2a2a] rounded-lg overflow-hidden flex flex-col"
      variants={hoverVariants}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap="pressed"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* IMAGE + Overlays */}
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-40 object-cover"
        />

        {/* Rating Overlay */}
        <span className="absolute top-2 right-2 flex items-center bg-white bg-opacity-75 dark:bg-black dark:bg-opacity-50 text-yellow-500 text-sm font-medium px-2 py-1 rounded-full">
          {Array.from({ length: 5 }).map((_, i) =>
            i < Math.round(avgRating) ? (
              <FaStar key={i} />
            ) : (
              <FaRegStar key={i} />
            )
          )}
          <span className="ml-1 text-gray-800 dark:text-gray-200 text-xs">
            ({reviews.length})
          </span>
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
          {item.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
          {item.description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-[#FF914D] font-bold text-lg">
            ₹{item.price}
          </span>
        </div>
      </div>

      {/* SLIDE-UP ADD BUTTON */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 w-full bg-white dark:bg-[#2a2a2a] p-3 flex justify-center"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={e => {
                e.preventDefault();
                onAdd(item);
              }}
              className="flex items-center gap-2 bg-[#FF914D] hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-full shadow-lg"
            >
              <FaPlusCircle className="text-xl" />
              Add to Cart
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* React Router Link Wrapper */}
      {/* We wrap the entire card in a transparent <Link> to preserve the hover area */}
      <Link
         to={`/dish/${item.id}`}
        className="absolute inset-0"
        aria-label={`View details for ${item.name}`}
      />
    </motion.div>
  );
};

FoodItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({ rating: PropTypes.number })
    )
  }).isRequired,
  onAdd: PropTypes.func.isRequired
};

export default FoodItem;
