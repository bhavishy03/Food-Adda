const express = require('express');
const router = express.Router();
const Address = require('../models/Address');

// Get all addresses for a user
router.get('/:userId', async (req, res) => {
  const addresses = await Address.find({ userId: req.params.userId });
  res.json(addresses);
});

// Add new address
router.post('/', async (req, res) => {
  const { userId, label, details } = req.body;
  const newAddress = new Address({ userId, label, details });
  await newAddress.save();
  res.status(201).json(newAddress);
});

// Update address
router.put('/:id', async (req, res) => {
  const { details } = req.body;
  const updated = await Address.findByIdAndUpdate(req.params.id, { details }, { new: true });
  res.json(updated);
});

// Delete address
router.delete('/:id', async (req, res) => {
  await Address.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;