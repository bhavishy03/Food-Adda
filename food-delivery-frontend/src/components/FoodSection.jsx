import React from 'react';
import FoodItem from './FoodItem';

const FoodSection = ({ title, items, onAdd }) => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <span>⭐</span> {title} ({items.length})
      </h2>

      {/* ✅ Only show if items exist */}
      {items && items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <FoodItem key={index} item={item} onAdd={onAdd} />
          ))}
        </div>
      ) : (
        <div className="text-gray-400 text-lg mt-4">Loading dishes...</div>
      )}
    </div>
  );
};

export default FoodSection;
