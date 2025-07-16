// src/pages/Addresses.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaMapMarkerAlt,
  FaPlus,
  FaTrashAlt,
  FaEdit,
  FaHome,
  FaBuilding,
  FaMapPin
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const API_BASE = 'http://localhost:5000/api/addresses';

const Addresses = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id;

  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState('');
  const [label, setLabel] = useState('Home');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // 🌗 Theme & Auth on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
    }

    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  // 🔁 Fetch addresses
  useEffect(() => {
    if (!userId) return;
    const fetchAddresses = async () => {
      try {
        const res = await axios.get(`${API_BASE}/${userId}`);
        setAddresses(res.data);
      } catch (err) {
        console.error('❌ Fetch error:', err);
        toast.error('🚫 Could not load addresses');
      }
    };
    fetchAddresses();
  }, [userId]);

  const handleAdd = async () => {
  if (!newAddress.trim()) return;
  try {
    const res = await axios.post(API_BASE, {
      userId,
      label,
      details: newAddress.trim(),
    });
    const updated = [...addresses, res.data];
    setAddresses(updated);
    setNewAddress('');
    setLabel('Home');
    localStorage.setItem('savedAddresses', JSON.stringify(updated)); // ✅ Sync localStorage
    toast.success('✅ Address added!');
    navigate('/checkout'); // ✅ Redirect to checkout after saving
  } catch (err) {
    console.error('❌ Add error:', err);
    toast.error('🚫 Failed to add address');
  }
};
  const handleDelete = async id => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setAddresses(prev => prev.filter(addr => addr._id !== id));
      toast.success('🗑️ Address deleted');
    } catch (err) {
      console.error('❌ Delete error:', err);
      toast.error('🚫 Failed to delete address');
    }
  };

  const handleEdit = id => {
    const addr = addresses.find(a => a._id === id);
    setEditingId(id);
    setEditingText(addr.details);
  };

  const saveEdit = async () => {
    if (!editingText.trim()) return;
    try {
      const res = await axios.put(`${API_BASE}/${editingId}`, {
        details: editingText.trim(),
      });
      setAddresses(prev =>
        prev.map(addr =>
          addr._id === editingId
            ? { ...addr, details: res.data.details }
            : addr
        )
      );
      setEditingId(null);
      setEditingText('');
      toast.success('✏️ Address updated');
    } catch (err) {
      console.error('❌ Update error:', err);
      toast.error('🚫 Failed to update address');
    }
  };

  const getIcon = lbl => {
    switch (lbl.toLowerCase()) {
      case 'home':
        return <FaHome className="text-orange-400 mr-2" />;
      case 'work':
        return <FaBuilding className="text-orange-400 mr-2" />;
      default:
        return <FaMapPin className="text-orange-400 mr-2" />;
    }
  };

  const dropdownOptions = [
    { value: 'Home', icon: <FaHome className="inline mr-2" />, label: 'Home' },
    { value: 'Work', icon: <FaBuilding className="inline mr-2" />, label: 'Work' },
    { value: 'Other', icon: <FaMapPin className="inline mr-2" />, label: 'Other' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#1e1e1e] p-5 text-[#212529] dark:text-white max-w-md mx-auto">
      <ToastContainer position="top-right" theme="dark" />

      {/* Header & Lottie */}
      <h2 className="text-3xl font-bold text-[#FF914D] mb-6 text-center">
        <FaMapMarkerAlt className="inline mr-2" />
        Your Addresses
      </h2>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-6"
      >
        <DotLottieReact
          src="https://lottie.host/1600f157-6155-4b75-b235-8b83ac760e61/hoaouW1JfG.lottie"
          autoplay
          loop
          style={{ height: 160, width: 160 }}
        />
      </motion.div>

      {/* Address List */}
      <div className="space-y-4 mb-8">
        {addresses.map(addr => (
          <motion.div
            key={addr._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-[#2a2a2a] p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700 transition"
          >
            <div className="flex items-start">
              {getIcon(addr.label)}
              <div className="flex-1">
                <p className="font-semibold text-[#FF914D] dark:text-orange-300">
                  {addr.label}
                </p>
                {editingId === addr._id ? (
                  <>
                    <textarea
                      rows="2"
                      value={editingText}
                      onChange={e => setEditingText(e.target.value)}
                      className="w-full p-2 mt-1 bg-[#f1f1f1] dark:bg-[#1e1e1e] border border-gray-300 dark:border-gray-600 rounded text-[#212529] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FF914D]"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={saveEdit}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1 rounded-full text-sm transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-1 rounded-full text-sm transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                      {addr.details}
                    </p>
                    <div className="flex gap-4 mt-3 text-sm">
                      <button
                        onClick={() => handleEdit(addr._id)}
                        className="flex items-center text-[#FF914D] hover:text-orange-500 transition"
                      >
                        <FaEdit className="mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(addr._id)}
                        className="flex items-center text-red-500 hover:text-red-400 transition"
                      >
                        <FaTrashAlt className="mr-1" /> Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add New Address */}
      <div className="space-y-3 mb-8">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
          Label
        </label>
        <select
          value={label}
          onChange={e => setLabel(e.target.value)}
          className="w-full p-2 bg-white dark:bg-[#2a2a2a] border border-gray-300 dark:border-gray-600 rounded text-[#212529] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FF914D]"
        >
          {dropdownOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
          Address
        </label>
        <textarea
          value={newAddress}
          onChange={e => setNewAddress(e.target.value)}
          rows="3"
          placeholder="Type your address here..."
          className="w-full p-3 bg-white dark:bg-[#2a2a2a] border border-gray-300 dark:border-gray-600 rounded text-[#212529] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FF914D] resize-none"
        />

        <button
          onClick={handleAdd}
          className="w-full flex items-center justify-center gap-2 bg-[#FF914D] hover:bg-orange-600 text-white py-3 rounded-full font-semibold transition"
        >
          <FaPlus /> Add Address
        </button>
      </div>

      {/* Back to Profile */}
      <button
        onClick={() => navigate('/profile')}
        className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-[#212529] dark:text-white py-3 rounded-full font-medium transition"
      >
        Back to Profile
      </button>
    </div>
  );
};

export default Addresses;
