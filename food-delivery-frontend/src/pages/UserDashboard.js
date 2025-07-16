// src/pages/UserDashboard.js
import React from 'react';

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Save user details after login

  return (
    <div className="max-w-3xl mx-auto p-6 text-white bg-[#1e1e1e] mt-10 rounded shadow">
      <h2 className="text-3xl font-bold mb-6 text-[#FF914D]">👤 User Dashboard</h2>

      {user ? (
        <div className="space-y-4">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>

          <button
            className="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = '/login';
            }}
          >
            🚪 Logout
          </button>
        </div>
      ) : (
        <p>No user info found. Please login.</p>
      )}
    </div>
  );
};

export default UserDashboard;
