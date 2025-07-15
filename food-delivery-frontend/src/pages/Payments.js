// src/pages/PaymentMethods.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaCreditCard,
  FaTrash,
  FaPlus,
  FaArrowLeft,
  FaMoneyCheckAlt,
  FaQrcode
} from 'react-icons/fa';

const PaymentMethods = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [form, setForm] = useState({
    cardNumber: '',
    name: '',
    expiry: '',
    cvv: '',
    address: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('paymentMethods') || '[]');
    setCards(saved);
  }, []);

  const validate = () => {
    const errs = {};
    if (!/^\d{16}$/.test(form.cardNumber))
      errs.cardNumber = 'Enter a valid 16-digit card number';
    if (!form.name) errs.name = 'Name is required';
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry))
      errs.expiry = 'Use MM/YY format';
    if (!/^\d{3,4}$/.test(form.cvv)) errs.cvv = 'Enter valid CVV';
    if (!form.address) errs.address = 'Billing address required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = e => {
    e.preventDefault();
    if (!validate()) return;
    const newCard = { ...form, id: Date.now() };
    const updated = [...cards, newCard];
    setCards(updated);
    localStorage.setItem('paymentMethods', JSON.stringify(updated));
    setForm({
      cardNumber: '',
      name: '',
      expiry: '',
      cvv: '',
      address: '',
    });
  };

  const handleDelete = id => {
    const filtered = cards.filter(c => c.id !== id);
    setCards(filtered);
    localStorage.setItem('paymentMethods', JSON.stringify(filtered));
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8 text-[#212529] dark:text-white">
      {/* 🔙 Back & Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 bg-[#FF914D] hover:bg-orange-600 text-white px-4 py-2 rounded-full shadow transition"
        >
          <FaArrowLeft className="text-sm" />
          <span className="text-sm font-medium">Back</span>
        </button>
        <div className="flex items-center gap-2">
          <FaMoneyCheckAlt className="text-[#FF914D] text-xl" />
          <h1 className="text-xl font-bold">Payment Methods</h1>
        </div>
      </div>

      {/* ➕ Add New Card */}
      <motion.form
        onSubmit={handleAdd}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-[#2a2a2a] p-6 rounded-lg shadow space-y-4"
      >
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-[#FF914D]">
          <FaPlus /> Add New Card
        </h2>

        <input
          type="text"
          name="cardNumber"
          value={form.cardNumber}
          onChange={handleChange}
          maxLength={16}
          placeholder="Card Number (16 digits)"
          className="w-full border p-2 rounded text-sm"
        />
        {errors.cardNumber && <p className="text-red-500 text-xs">{errors.cardNumber}</p>}

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name on Card"
          className="w-full border p-2 rounded text-sm"
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              placeholder="MM/YY"
              className="w-full border p-2 rounded text-sm"
            />
            {errors.expiry && <p className="text-red-500 text-xs">{errors.expiry}</p>}
          </div>
          <div>
            <input
              type="password"
              name="cvv"
              value={form.cvv}
              onChange={handleChange}
              maxLength={4}
              placeholder="CVV"
              className="w-full border p-2 rounded text-sm"
            />
            {errors.cvv && <p className="text-red-500 text-xs">{errors.cvv}</p>}
          </div>
        </div>

        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          rows={2}
          placeholder="Billing Address"
          className="w-full border p-2 rounded text-sm"
        />
        {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}

        <button
          type="submit"
          className="w-full bg-[#FF914D] hover:bg-orange-600 text-white py-2 rounded-full flex items-center justify-center gap-2 font-medium"
        >
          <FaPlus /> Save Card
        </button>
          {/* 💳 Saved Cards */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-[#FF914D]">
          <FaCreditCard /> Saved Cards
        </h2>
        <div className="space-y-4">
          {cards.length ? (
            cards.map(card => (
              <div
                key={card.id}
                className="flex items-center justify-between bg-gradient-to-r from-orange-50 to-white dark:from-[#2a2a2a] dark:to-[#1e1e1e] p-4 rounded-xl shadow hover:shadow-md transition"
              >
                <div>
                  <p className="font-bold text-lg">**** **** **** {card.cardNumber.slice(-4)}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{card.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Exp: {card.expiry}</p>
                </div>
                <button
                  onClick={() => handleDelete(card.id)}
                  className="text-red-500 hover:text-red-600"
                  title="Remove card"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No saved cards yet.</p>
          )}
        </div>
      </section>
      
      </motion.form>
    </div>
  );
};

export default PaymentMethods;
