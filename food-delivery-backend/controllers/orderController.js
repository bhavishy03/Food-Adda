// src/controllers/orderController.js
const mongoose = require('mongoose');
const Order    = require('../models/Order');
const User     = require('../models/User');

// ─── CREATE NEW ORDER ─────────────────────────────────────────────────────────
exports.placeOrder = async (req, res) => {
  try {
    const {
      userId,
      name: bodyName,
      phone: bodyPhone,
      address,
      paymentMethod,
      items,
      totalAmount
    } = req.body;

    // 1️⃣ Required fields check
    if (
      !userId ||
      !address ||
      !paymentMethod ||
      !Array.isArray(items) ||
      !items.length ||
      totalAmount == null
    ) {
      return res
        .status(400)
        .json({ success: false, message: 'Missing required fields' });
    }

    // 2️⃣ Fetch user and validate name
    const user = await User.findById(userId);
    if (!user || !user.name) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid user or missing name' });
    }

    // 3️⃣ Compute final values
    const customerName  = user.name || bodyName;
    const customerPhone = bodyPhone || user.phone || 'unknown-phone';
    const formattedAddress =
      typeof address === 'object' && address.details
        ? address.details
        : String(address);

    // 4️⃣ Create & save
    const newOrder = new Order({
      userId,
      name: customerName,
      phone: customerPhone,
      address: formattedAddress,
      items,
      totalAmount,
      paymentMethod
    });

    const savedOrder = await newOrder.save();
    return res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    console.error('❌ Error saving order:', error);
    return res
      .status(500)
      .json({ success: false, message: 'Failed to save order' });
  }
};

// ─── GET ORDERS BY USER ────────────────────────────────────────────────────────
exports.getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid userId' });
    }

    const userOrders = await Order.find({ userId }).sort({ date: -1 });
    return res.status(200).json({ success: true, orders: userOrders });
  } catch (error) {
    console.error('❌ Error fetching user orders:', error);
    return res
      .status(500)
      .json({ success: false, message: 'Failed to fetch orders' });
  }
};

// ─── CANCEL ONE ORDER ─────────────────────────────────────────────────────────
exports.cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid orderId' });
    }

    const updated = await Order.findByIdAndUpdate(
      orderId,
      { status: 'Cancelled' },
      { new: true }
    );
    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: 'Order not found' });
    }
    return res.status(200).json({ success: true, order: updated });
  } catch (error) {
    console.error('❌ Error cancelling order:', error);
    return res
      .status(500)
      .json({ success: false, message: 'Failed to cancel order' });
  }
};

// ─── GET ONE ORDER ─────────────────────────────────────────────────────────────
exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid orderId' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: 'Order not found' });
    }
    return res.status(200).json({ success: true, order });
  } catch (error) {
    console.error('❌ Error fetching order by ID:', error);
    return res
      .status(500)
      .json({ success: false, message: 'Failed to fetch order' });
  }
};
