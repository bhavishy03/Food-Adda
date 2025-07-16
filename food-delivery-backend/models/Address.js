const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  label: {
    type: String,
    default: 'Other',
  },
  details: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Address', addressSchema);
