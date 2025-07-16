// src/pages/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-[#1e1e1e] text-white mt-10 rounded shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-[#FF914D]">Welcome, {user?.name}!</h2>
      <p className="mb-4">📧 Email: {user?.email}</p>

      <button
        onClick={handleLogout}
        className="bg-[#FF914D] hover:bg-orange-600 px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
