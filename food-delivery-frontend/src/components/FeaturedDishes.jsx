import React, { useState } from 'react';
import foodData from '../data/foodData';
import CategoryFilter from './CategoryFilter';

const FeaturedDishes = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [...new Set(foodData.map((item) => item.category))];

  const filteredDishes = foodData.filter((item) => {
    const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });
  
  return (
    <div className="py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Featured Dishes</h2>

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      {/* Search Input */}
      <input
      type="text"
      placeholder="Search for food..."
      className="w-full mb-6 px-4 py-2 border border-gray-300 rounded"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Dishes List */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredDishes.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.category}</p>
              <p className="text-md font-bold mt-2">₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedDishes;
