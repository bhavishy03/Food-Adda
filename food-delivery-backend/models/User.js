const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

 profilePicture: {
  type: String,
  default: "default-profile.png", // ✅ fallback image
},


  address: {
    type: String,
    default: "",
  },
   resetOTP: { type: Number },
  otpExpiry: { type: Date },

  orders: [
    {
      items: {
        type: Array,
        default: [],
      },
      totalAmount: {
        type: Number,
        default: 0,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
