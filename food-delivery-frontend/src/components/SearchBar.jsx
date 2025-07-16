import React from 'react';

const SearchBar = () => {
  return (
    <div className="flex justify-center my-6">
      <input
        type="text"
        placeholder="Search for dishes or restaurants..."
        className="w-2/3 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
    </div>
  );
};

export default SearchBar;
