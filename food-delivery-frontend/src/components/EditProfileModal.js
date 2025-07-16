// src/components/EditProfileModal.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const EditProfileModal = ({ user, isOpen, onClose, onProfileUpdated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    process.env.PUBLIC_URL + '/default-profile.png'
  );
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // sync form fields & image preview whenever `user` changes
  useEffect(() => {
    if (!user) return;
    setFormData({
      name: user.name || '',
      email: user.email || '',
      address: user.address || '',
    });

    if (user.profilePicture && user.profilePicture !== 'undefined') {
      setImagePreview(`http://localhost:5000/uploads/${user.profilePicture}`);
    } else {
      setImagePreview(process.env.PUBLIC_URL + '/default-profile.png');
    }

    setError('');
    setMessage('');
    setIsError(false);
  }, [user]);

  if (!isOpen || !user) return null;

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    const selected = e.target.files[0];
    setFile(selected);
    if (selected) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(selected);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); setMessage(''); setIsError(false);

    if (!user._id) {
      setError('User data missing.');
      return;
    }

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('email', formData.email);
    payload.append('address', formData.address);
    if (file) payload.append('profilePicture', file);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/${user._id}`,
        payload
      );
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setMessage('Profile updated successfully!');
      setIsError(false);
      onProfileUpdated();
      setTimeout(onClose, 800); // small delay so message shows
    } catch (err) {
      console.error(err);
      setError('Failed to update profile.');
      setIsError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1e1e1e] text-[#212529] dark:text-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        {/* header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-[#FF914D]">Edit Profile</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition"
          >
            ✕
          </button>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* avatar */}
          <div className="flex flex-col items-center">
            <img
              src={imagePreview}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full object-cover border-2 border-[#FF914D] mb-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm text-gray-600 dark:text-gray-300"
            />
          </div>

          {/* fields */}
          <div className="space-y-3">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#FF914D] transition"
            />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#FF914D] transition"
            />
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#FF914D] transition"
            />
          </div>

          {/* error or success */}
          {(error || message) && (
            <div className="flex items-center gap-2 text-sm">
              {error && (
                <span className="flex items-center text-red-500">
                  <FaExclamationCircle className="mr-1" />
                  {error}
                </span>
              )}
              {message && (
                <span className="flex items-center text-green-500">
                  <FaCheckCircle className="mr-1" />
                  {message}
                </span>
              )}
            </div>
          )}

          {/* actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#FF914D] text-white hover:bg-orange-600 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
