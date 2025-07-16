// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Homepage from './pages/Homepage';
import FoodDetail from './pages/FoodDetail';
import Checkout from './pages/Checkout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import UserDashboard from './pages/UserDashboard';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import { CartProvider, useCart } from './context/CartContext';
import './index.css';
import Notifications from './pages/Notifications';
import EditProfile from './pages/EditProfile';
import Orders from './pages/OrderHistory';
import Addresses from './pages/Addresses';
import Payments from './pages/Payments';
import OrderLiveTrack from './pages/TrackOrder';
import TrackOrder from './pages/TrackOrder';
import ForgotPassword from "./pages/ForgotPassword";
import DishDetails from './pages/DishDetails';




// ✅ Navbar wrapper to use context inside App
const AppContent = () => {
  const { getItemCount } = useCart();

  return (
    <>
      <Navbar cartItemCount={getItemCount()} />
      <div className="min-h-screen bg-white dark:bg-[#1e1e1e] text-black dark:text-white">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/food/:id" element={<FoodDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/userdashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/orders" element={<Orders userId={JSON.parse(localStorage.getItem('user'))?._id} />} />
          <Route path="/addresses" element={<Addresses />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/live-track" element={<OrderLiveTrack />} />
          <Route path="/track-order/:id" element={<TrackOrder />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dish/:id" element={<DishDetails />} />


         </Routes>
      </div>
    </>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
