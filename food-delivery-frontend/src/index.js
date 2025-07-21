// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import axios from 'axios';

import { CartProvider } from './context/CartContext'; // ✅ ensure cart context wraps app
import reportWebVitals from './reportWebVitals';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// 🪄 Create root using React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);

// 📊 Optional: performance tracking
reportWebVitals(console.log); // ✅ logs metrics like FCP, CLS etc.
