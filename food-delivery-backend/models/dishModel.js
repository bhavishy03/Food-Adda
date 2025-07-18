// models/dishModel.js
const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: String,
  image: String,
  description: String
}, {
  timestamps: true
});

const Dish = mongoose.model('Dish', dishSchema);
module.exports = Dish;
