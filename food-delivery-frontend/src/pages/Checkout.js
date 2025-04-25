import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  

    const { getTotalAmount } = useCart();  // 
    const totalAmount = getTotalAmount(); 
 
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: ''
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load. Check your connection.');
      return;
    }

    const options = {
      key: 'rzp_test_Cz4fOBFIqVXR9P',
      amount: totalAmount * 100,
      currency: 'INR',
      name: 'Food Delivery',
      description: 'Order Payment',
      handler: function (response) {
        console.log('Razorpay Success:', response);
        setOrderPlaced(true);
      },
      prefill: {
        name: formData.name,
        contact: formData.phone
      },
      theme: {
        color: '#FF914D'
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (paymentMethod === 'cod') {
      setOrderPlaced(true);
    } else {
      handleRazorpayPayment();
    }
  };

  if (orderPlaced) {
    return (
      <div className="p-6 text-white text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-400">🎉 Order Placed Successfully!</h2>
        <p>Thank you for your order, {formData.name}.</p>
        <p className="mt-2 text-orange-300">Your food will arrive soon 🚚🍕</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">🧾 Checkout</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-[#2a2a2a] p-6 rounded shadow">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-[#1e1e1e] text-white border border-gray-600"
        />
        <textarea
          name="address"
          placeholder="Delivery Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-[#1e1e1e] text-white border border-gray-600"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-[#1e1e1e] text-white border border-gray-600"
        />

        <div className="text-white">
          <label className="mr-4">
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={() => setPaymentMethod('cod')}
              className="mr-2"
            />
            Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              value="razorpay"
              checked={paymentMethod === 'razorpay'}
              onChange={() => setPaymentMethod('razorpay')}
              className="mr-2 ml-4"
            />
            Razorpay
          </label>
        </div>

        <div className="text-right text-lg font-bold">
          Total: ₹{totalAmount}
        </div>

        <button
          type="submit"
          className="w-full bg-[#FF914D] text-white py-2 px-4 rounded hover:bg-orange-600"
        >
          {paymentMethod === 'cod' ? 'Place Order' : 'Pay with Razorpay'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
