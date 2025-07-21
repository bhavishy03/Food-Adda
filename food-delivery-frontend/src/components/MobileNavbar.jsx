// src/components/MobileNavbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiShoppingCart, FiUser, FiList } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function MobileNavbar() {
  // Quick localStorage fallback for user
  const user = JSON.parse(localStorage.getItem('user'));

  // Safely extract cart array (default to empty array)
  const cartCtx = useCart();
  const cart = Array.isArray(cartCtx?.cart) ? cartCtx.cart : [];

  const { pathname } = useLocation();

  const navItems = [
    { to: '/menu', icon: <FiMenu />, label: 'Menu' },
    {
      to: '/cart',
      icon: <FiShoppingCart />,
      label: 'Cart',
      badge: cart.length // now always defined
    },
    { to: '/orders', icon: <FiList />, label: 'Orders' },
    {
      to: user ? '/profile' : '/login',
      icon: user
        ? (
          <img
            src={
              user.profilePicture
                ? `${process.env.REACT_APP_BASE_URL.replace('/api', '')}/uploads/${user.profilePicture}`
                : '/default-profile.png'
            }
            alt='You'
            className='w-6 h-6 rounded-full object-cover'
          />
        )
        : <FiUser />,
      label: user ? 'Profile' : 'Login'
    }
  ];

  return (
    <nav className='fixed bottom-0 left-0 right-0 bg-white border-t shadow-md sm:hidden'>
      <ul className='flex justify-around items-center py-2'>
        {navItems.map(({ to, icon, label, badge }) => (
          <li key={to} className='relative'>
            <Link
              to={to}
              className={`flex flex-col items-center text-gray-600 ${
                pathname.startsWith(to) ? 'text-indigo-600' : ''
              }`}
            >
              {icon}
              {badge > 0 && (
                <span className='absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1'>
                  {badge}
                </span>
              )}
              <span className='text-xs mt-1'>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
