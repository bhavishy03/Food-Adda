import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiShoppingCart } from 'react-icons/fi';
import { MdRestaurantMenu } from 'react-icons/md';
import { FaSignInAlt } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { to: '/', label: 'Home', icon: <FiHome className="text-xl" /> },
    { to: '/menu', label: 'Menu', icon: <MdRestaurantMenu className="text-xl" /> },
    { to: '/cart', label: 'Cart', icon: <FiShoppingCart className="text-xl" /> },
  ];

  return (
    <nav className="bg-[#1e1e1e] text-white px-6 py-4 shadow-lg border-b border-[#FF914D33]">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <span className="text-[#FF914D] font-extrabold text-2xl tracking-wide">FOOD DADDA</span>
        <div className="space-x-8 text-lg flex items-center">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-2 px-2 py-1 rounded-md transition-all duration-300 hover:text-[#FF914D] hover:underline underline-offset-4 ${
                currentPath === item.to ? 'text-[#FF914D] font-semibold' : ''
              }`}
            >
              {item.icon} {item.label}
            </Link>
          
          ))}
           <Link
              to="/signup"
                className={`flex items-center gap-2 px-2 py-1 rounded-md transition-all duration-300 hover:text-[#FF914D] hover:underline underline-offset-4 ${
                currentPath === '/signup' ? 'text-[#FF914D] font-semibold' : ''
               }`}
               >
              👤 Sign Up
            </Link>

            <Link
              to="/login"
             className={`flex items-center gap-2 px-2 py-1 rounded-md transition-all duration-300 hover:text-[#FF914D] hover:underline underline-offset-4 ${
             currentPath === '/login' ? 'text-[#FF914D] font-semibold' : ''
             }`}
             >
             <FaSignInAlt className="text-xl" /> Login
            </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
