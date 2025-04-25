// ProfilePage.js
import React, { useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [profilePic, setProfilePic] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    language: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('profilePic', file);

    try {
      const res = await axios.post('http://localhost:5000/api/users/upload-profile', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProfilePic(res.data.imageUrl); // imageUrl should come from backend
    } catch (err) {
      console.error('Image upload failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white p-8 flex flex-col md:flex-row justify-around">
      
      {/* Edit Profile Section */}
      <div className="bg-[#2a2a2a] p-6 rounded-lg w-full md:w-1/2 mb-6 md:mb-0">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
        <div className="flex justify-center mb-4">
          <img
            src={profilePic || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 w-full text-sm bg-[#333] border border-gray-600 rounded px-3 py-2"
        />
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="mb-3 w-full bg-[#333] border border-gray-600 rounded px-3 py-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="mb-3 w-full bg-[#333] border border-gray-600 rounded px-3 py-2"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="mb-3 w-full bg-[#333] border border-gray-600 rounded px-3 py-2"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="mb-3 w-full bg-[#333] border border-gray-600 rounded px-3 py-2"
        />
        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
          className="mb-3 w-full bg-[#333] border border-gray-600 rounded px-3 py-2"
        >
          <option value="">Select Language</option>
          <option value="english">English</option>
          <option value="hindi">Hindi</option>
        </select>
        <button className="bg-[#FF914D] text-white px-4 py-2 rounded hover:bg-orange-500">
          Update Profile
        </button>
      </div>

      {/* Profile Overview Section */}
      <div className="bg-[#2a2a2a] p-6 rounded-lg w-full md:w-1/3">
        <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
        <div className="flex justify-center mb-4">
          <img
            src={profilePic || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold text-center">{formData.name || "Your Name"}</h3>
        <p className="text-center text-sm text-gray-400">{formData.email || "youremail@example.com"}</p>
        <ul className="mt-4 space-y-2">
          <li>📍 Address: {formData.address}</li>
          <li>📞 Phone: {formData.phone}</li>
          <li>🌐 Language: {formData.language}</li>
        </ul>
        <button className="mt-6 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
