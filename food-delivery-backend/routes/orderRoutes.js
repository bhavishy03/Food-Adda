// src/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getOrdersByUser,
  cancelOrder,
  getOrderById
} = require('../controllers/orderController');

// 📥 Log incoming payload for every new order
router.post(
  '/',
  (req, res, next) => {
    console.log('📥 Incoming order payload:', req.body);
    next();
  },
  placeOrder
);

// 🧾 Get all orders for one user
router.get('/user/:userId', getOrdersByUser);

// ❌ Cancel one order
router.put('/cancel/:orderId', cancelOrder);

// 🔍 Get one order by ID
router.get('/:orderId', getOrderById);

module.exports = router;
