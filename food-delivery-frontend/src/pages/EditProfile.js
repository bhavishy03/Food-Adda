import React, { useState } from 'react';
import axios from 'axios';

const EditProfileModal = ({ user, isOpen, onClose, onProfileUpdated }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: user?.address || '',
  });
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(user?.profilePicture || process.env.PUBLIC_URL + '/default-profile.png');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('address', formData.address);
    if (file) data.append('profilePicture', file);

    try {
      const res = await axios.put(`http://localhost:5000/api/users/${user.id}`, data);
      setMessage('✅ Profile updated!');
      localStorage.setItem('user', JSON.stringify(res.data));
      onProfileUpdated(); // refresh main profile
      onClose(); // close modal
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to update profile.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] p-6 rounded-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-white text-xl">✖</button>
        <h2 className="text-xl font-bold text-[#FF914D] mb-4">✏️ Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover border-2 border-orange-500 mb-2"
            />
            <input type="file" onChange={handleFileChange} className="text-white" />
          </div>

          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 rounded bg-[#2a2a2a]" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 rounded bg-[#2a2a2a]" />
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full p-2 rounded bg-[#2a2a2a]" />

          <button type="submit" className="bg-[#FF914D] w-full py-2 rounded hover:bg-orange-600">
            Save Changes
          </button>
          {message && <p className="text-sm text-green-400">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
