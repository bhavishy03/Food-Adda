// src/pages/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import {
  FaHome,
  FaBuilding,
  FaMapPin,
  FaEdit,
  FaMoneyBillWave,
  FaQrcode
} from 'react-icons/fa';
import OrderConfirmed from '../components/OrderConfirmed';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalAmount, clearCart } = useCart();

  // Pull user info
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user?._id;
  const userName = user?.name || '';
  const userPhone = user?.phone || '';

  // Local state
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddrId, setSelectedAddrId]   = useState(null);
  const [paymentMethod, setPaymentMethod]     = useState('cod');
  const [showQR, setShowQR]                   = useState(false);
  const [orderPlaced, setOrderPlaced]         = useState(false);
  const [orderData, setOrderData]             = useState(null);
  const [error, setError]                     = useState('');

  // Price calculation
  const baseAmount  = getTotalAmount();
  const deliveryFee = 40;
  const gstAmount   = Math.round(baseAmount * 0.05);
  const totalAmount = baseAmount + deliveryFee + gstAmount;

  // Load saved addresses once
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('savedAddresses') || '[]');
    setSavedAddresses(stored);
    if (stored.length) {
      setSelectedAddrId(stored[0]._id || stored[0].id);
    }
  }, []);

  // Icon helper
  const getIcon = label => {
    switch (label.toLowerCase()) {
      case 'home': return <FaHome className="text-[#FF914D] mr-2" />;
      case 'work': return <FaBuilding className="text-[#FF914D] mr-2" />;
      default:     return <FaMapPin className="text-[#FF914D] mr-2" />;
    }
  };

  // Save order (COD or after UPI)
  const saveOrderToBackend = async () => {
    const selected = savedAddresses.find(
      a => (a._id ?? a.id) === selectedAddrId
    );

    if (!userId || !selected || !cartItems.length || totalAmount === 0) {
      setError('Please check login, address, or cart contents.');
      return;
    }

    const formattedAddress =
      typeof selected === 'object' && selected.details
        ? selected.details
        : String(selected);

    const payload = {
      userId,
      name: userName,
      phone: userPhone || 'unknown-phone',
      address: formattedAddress,
      paymentMethod,
      items: cartItems.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      totalAmount
    };

    try {
      const res = await axios.post('https://food-adda-backend.onrender.com/api/orders', payload);
      clearCart();

      // Merge backend order with local items so we can show images/details
      const finalOrder = {
        ...res.data.order,
        items: cartItems
      };

      setOrderData(finalOrder);
      setOrderPlaced(true);
    } catch (err) {
      console.error('Order save error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Server error. Please try again.');
    }
  };

  // Trigger Razorpay for UPI
  const triggerRazorpayUPI = async () => {
    const loaded = await new Promise(resolve => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

    if (!loaded) {
      setError('Failed to load Razorpay SDK');
      return;
    }

    const options = {
      key: 'rzp_test_Cz4fOBFIqVXR9P',
      amount: totalAmount * 100,
      currency: 'INR',
      name: 'FOOD DADDA',
      description: 'UPI Payment',
      handler: () => saveOrderToBackend(),
      prefill: { name: userName, contact: userPhone },
      theme: { color: '#FF914D' },
      method: { upi: true }
    };

    new window.Razorpay(options).open();
  };

  // Main place-order handler
  const handlePlaceOrder = () => {
    setError('');
    if (!selectedAddrId) {
      setError('Please select a delivery address.');
      return;
    }
    paymentMethod === 'upi' ? triggerRazorpayUPI() : saveOrderToBackend();
  };

  // Show confirmation screen once order is placed
  if (orderPlaced) {
    return <OrderConfirmed order={orderData} />;
  }

  // Main checkout form
  return (
    <div className="max-w-md mx-auto px-4 py-6 bg-white dark:bg-[#1e1e1e] rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-[#FF914D]">Select Delivery Address</h2>

      {/* Address List */}
      {savedAddresses.length ? (
        <div className="space-y-4 mb-6">
          {savedAddresses.map(addr => {
            const addrId = addr._id || addr.id;
            return (
              <label
                key={addrId}
                className={`flex items-start p-4 border rounded-lg cursor-pointer transition ${
                  selectedAddrId === addrId
                    ? 'border-[#FF914D] bg-orange-50 dark:bg-[#2a2a2a]'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <input
                  type="radio"
                  name="address"
                  checked={selectedAddrId === addrId}
                  onChange={() => {
                    setSelectedAddrId(addrId);
                    setError('');
                  }}
                  className="mt-1 mr-3"
                />
                <div className="flex-grow">
                  <div className="flex items-center mb-1">
                    {getIcon(addr.label)}
                    <span className="font-semibold">{addr.label}</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{addr.details}</p>
                </div>
                <FaEdit className="ml-3 text-gray-400 hover:text-gray-600" />
              </label>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 mb-6">No saved addresses found.</p>
      )}

      {/* Payment Method */}
      <div className="mb-6 space-y-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={paymentMethod === 'cod'}
            onChange={() => setPaymentMethod('cod')}
          />
          <span className="flex items-center gap-2 font-semibold">
            <FaMoneyBillWave className="text-[#FF914D]" /> Cash on Delivery
          </span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="upi"
            checked={paymentMethod === 'upi'}
            onChange={() => setPaymentMethod('upi')}
          />
          <span className="flex items-center gap-2 font-semibold">
            <FaQrcode className="text-[#FF914D]" /> UPI (PhonePe / GPay / Paytm)
          </span>
        </label>

        {paymentMethod === 'upi' && (
          <div className="mt-2 p-4 border rounded-lg bg-orange-50 dark:bg-[#2a2a2a] text-center">
            <button
              onClick={() => setShowQR(prev => !prev)}
              className="text-blue-500 hover:underline mb-3"
            >
              {showQR ? 'Hide QR Code' : 'Show QR Code'}
            </button>
            {showQR && (
              <img
                src="/images/sample-upi-qr.png"
                alt="UPI QR"
                className="mx-auto w-32 h-32 rounded-lg border mb-3"
              />
            )}
            <div className="flex justify-center gap-4">
              <img src="/images/phonepe.png" alt="PhonePe" className="w-8 h-8 rounded-full" />
              <img src="/images/gpay.png" alt="GPay"    className="w-8 h-8 rounded-full" />
              <img src="/images/paytm.png" alt="Paytm"  className="w-8 h-8 rounded-full" />
            </div>
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="mb-4 p-4 bg-white dark:bg-[#2a2a2a] border rounded-lg space-y-2">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <span>Subtotal</span>
          <span>₹{baseAmount}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <span>Delivery Fee</span>
          <span>₹{deliveryFee}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <span>GST (5%)</span>
          <span>₹{gstAmount}</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>

      {error && <p className="mb-2 text-red-500 text-sm">{error}</p>}

      <button
        onClick={handlePlaceOrder}
        className="w-full py-2 font-semibold text-white bg-[#FF914D] hover:bg-orange-600 rounded-full transition"
      >
        📦 Confirm Order (₹{totalAmount})
      </button>
    </div>
  );
};

export default Checkout;
