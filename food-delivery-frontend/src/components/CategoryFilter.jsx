import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-3 my-4">
      {['All', ...categories].map((category) => (
        <button
          key={category}
          className={`px-4 py-2 rounded-full border ${
            selectedCategory === category
              ? 'bg-blue-500 text-white'
              : 'bg-white text-black'
          }`}
          onClick={() => onCategoryCha
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter