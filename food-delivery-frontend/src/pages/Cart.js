import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { MdShoppingCartCheckout } from 'react-icons/md';

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // 🌗 Apply saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || !savedTheme) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 text-[#212529] dark:text-white">
      {/* 🛒 Cart Header */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-2">
        <MdShoppingCartCheckout className="text-[#FF914D] text-2xl sm:text-3xl" />
        Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white dark:bg-[#2a2a2a] text-[#212529] dark:text-white p-4 rounded-lg shadow gap-4"
            >
              {/* 🖼️ Item Info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                  <p className="text-orange-500 font-bold mt-1">₹{item.price}</p>
                </div>
              </div>

              {/* ➕➖ Quantity + ❌ Remove */}
              <div className="flex flex-wrap items-center justify-between sm:justify-end gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-[#FF914D] px-2 py-1 rounded text-white hover:bg-orange-600"
                  >
                    -
                  </button>
                  <span className="px-2 font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-[#FF914D] px-2 py-1 rounded text-white hover:bg-orange-600"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  <span className="hidden sm:inline">Remove</span>
                  <span className="sm:hidden">❌</span>
                </button>
              </div>
            </div>
          ))}

          {/* 💰 Total & Checkout */}
          <div className="text-right text-lg font-bold mt-6 text-[#212529] dark:text-white">
            Total: ₹{totalPrice}
          </div>

          <div className="flex justify-end">
            <button
              className="mt-4 bg-[#FF914D] text-white px-6 py-2 rounded hover:bg-orange-600 text-sm sm:text-base"
              onClick={() => navigate('/checkout')}
            >
              Go to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
