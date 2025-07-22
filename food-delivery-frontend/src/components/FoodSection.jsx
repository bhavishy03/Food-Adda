import React from 'react';
import FoodItem from './FoodItem';

const FoodSection = ({ title, items, onAdd }) => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <FoodItem key={index} item={item} onAdd={onAdd} />
        ))}
      </div>
    </div>
  );
};

export default FoodSection;
