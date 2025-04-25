import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

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

  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-[#2a2a2a] p-4 rounded-lg shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-400">{item.category}</p>
                  <p className="text-orange-400 font-bold mt-1">₹{item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-[#FF914D] px-2 py-1 rounded text-white hover:bg-orange-600"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
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
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right text-lg font-bold mt-6">
            Total: ₹{totalPrice}
          </div>

          <div className="text-right">
            <button
              className="mt-4 bg-[#FF914D] text-white px-6 py-2 rounded hover:bg-orange-600"
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
