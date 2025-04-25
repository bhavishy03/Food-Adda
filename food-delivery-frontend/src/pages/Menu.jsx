// src/pages/Menu.js
import React, { useState } from 'react';
import foodData from '../data/foodData';
import FoodItem from '../components/FoodItem';
import { useCart } from '../context/CartContext';

const Menu = () => {
  const { addToCart } = useCart();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const filteredItems = foodData.filter(item => {
    return (
      (item?.name?.toLowerCase().includes(search.toLowerCase()) ||
       item?.description?.toLowerCase().includes(search.toLowerCase())) &&
      (category ? item?.category === category : true)
    );
  });
  

  return (
    <div className="bg-[#1e1e1e] text-white min-h-screen p-6">
      {/* Search Section */}
      <section className="text-center mb-8">
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 rounded-md w-1/2 bg-[#2d2d2d] text-white border border-[#444444]"
        />
      </section>

      {/* Category Filter */}
      <section className="text-center mb-8">
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 rounded-md bg-[#2d2d2d] text-white border border-[#444444]"
        >
          <option value="">All Categories</option>
          <option value="Pizza">Pizza</option>
          <option value="Burger">Burger</option>
          <option value="Indian">Indian</option>
          <option value="Desserts">Desserts</option>
          <option value="Beverages">Beverages</option>
          <option value="Pasta">Pasta</option>
          <option value="Sandwich">Sandwich</option>
        </select>
      </section>

      {/* Menu Items */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <FoodItem key={item.id} item={item} addToCart={addToCart} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Menu;
