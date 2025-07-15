// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUserCircle,
  FaCog,
  FaMoon,
  FaSun,
  FaSignOutAlt,
  FaUserEdit,
  FaBell,
  FaMapMarkerAlt,
  FaCreditCard,
  FaListAlt
} from 'react-icons/fa';
import EditProfileModal from '../components/EditProfileModal';


const ProfileItem = ({ icon, label, onClick }) => (
  <div
    className="flex items-center justify-between bg-white dark:bg-[#2a2a2a] text-[#212529] dark:text-white px-4 py-3 rounded-lg shadow cursor-pointer hover:shadow-md transition"
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      <span className="text-xl text-[#FF914D]">{icon}</span>
      <span className="text-md font-medium">{label}</span>
    </div>
    <span className="text-xl text-gray-400">{'>'}</span>
  </div>
);

const Profile = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const [isDark, setIsDark] = useState(() =>
  localStorage.getItem('theme') === 'dark' ||
  document.body.classList.contains('dark')
);


 const handleDarkModeToggle = () => {
  const next = !isDark;
  setIsDark(next);
  document.body.classList.toggle('dark', next);
  localStorage.setItem('theme', next ? 'dark' : 'light');
};

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || !savedTheme) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);

  const handleSettings = () => {
    alert('Settings page coming soon!');
  };

  if (!user) {
    return (
      <p className="text-red-500 text-center mt-10">
        ⚠️ User data not found. Please login again.
      </p>
    );
  }

  const profileSrc = user?.profilePicture
    ? `http://localhost:5000/uploads/${user.profilePicture}`
    : null;

  return (
    <div className="max-w-md mx-auto px-4 py-6 text-[#212529] dark:text-white">
      {/* 👤 Profile Header */}
      <div className="flex flex-col items-center mb-8">
        {profileSrc ? (
          <img
            src={profileSrc}
            alt="Profile"
            className="w-28 h-28 object-cover rounded-full border-4 border-[#FF914D] shadow"
          />
        ) : (
          <FaUserCircle className="w-28 h-28 text-[#FF914D] bg-white dark:bg-[#2a2a2a] rounded-full p-2 border-4 border-[#FF914D]" />
        )}
        <h2 className="text-2xl font-semibold mt-4">{user.name}</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{user.email}</p>
      </div>

      {/* 🔘 Account Items */}
      <div className="space-y-4 mb-8">
        <ProfileItem icon={<FaUserEdit />} label="Edit Profile" onClick={() => setIsModalOpen(true)} />
        <ProfileItem icon={<FaListAlt />} label="Orders" onClick={() => navigate('/orders')} />
        <ProfileItem icon={<FaMapMarkerAlt />} label="Addresses" onClick={() => navigate('/addresses')} />
        <ProfileItem
  icon={<FaCreditCard />}
  label="Payment Methods"
 onClick={() => navigate('/payments')}

/>

        <ProfileItem
  icon={<FaBell />}
  label="Notifications"
  onClick={() => navigate('/notifications')}
/>
      </div>

      {/* ⚙️ Bottom Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <button
          onClick={handleSettings}
          className="bg-white dark:bg-[#2a2a2a] hover:bg-orange-100 dark:hover:bg-[#333] transition p-3 rounded flex items-center gap-3 justify-center text-sm shadow"
        >
          <FaCog className="text-lg text-[#FF914D]" />
          Settings
        </button>
      <button
  onClick={handleDarkModeToggle}
  className="bg-white dark:bg-[#2a2a2a] hover:bg-orange-100 dark:hover:bg-[#333] transition p-3 rounded flex items-center gap-3 justify-center text-sm shadow"
>
  {isDark ? (
    <FaSun className="text-lg text-yellow-400" />
  ) : (
    <FaMoon className="text-lg text-[#FF914D]" />
  )}
  Dark Mode
</button>


      </div>

      <button
        onClick={handleLogout}
        className="bg-[#FF914D] hover:bg-orange-600 transition w-full p-3 rounded flex items-center gap-3 justify-center text-sm font-semibold text-white shadow"
      >
        <FaSignOutAlt className="text-lg" />
        Log Out
      </button>

      {/* ✨ Edit Modal */}
      <EditProfileModal
        user={user}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProfileUpdated={() => window.location.reload()}
      />
    </div>
  );
};

export default Profile;
