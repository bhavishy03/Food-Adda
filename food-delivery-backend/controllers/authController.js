const nodemailer = require("nodemailer");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    console.log("SIGNUP REQUEST:", { name: trimmedName, email: trimmedEmail });

    const existingUser = await User.findOne({ email: trimmedEmail });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: trimmedName,
      email: trimmedEmail,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ msg: "Signup successful" });
  } catch (err) {
    console.error("SIGNUP ERROR:", err.message);
    res.status(500).json({ error: "Internal server error during signup" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const trimmedEmail = email.trim().toLowerCase();

    console.log("LOGIN REQUEST:", { email: trimmedEmail });

    const user = await User.findOne({ email: trimmedEmail });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    res.status(500).json({ error: "Internal server error during login" });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const trimmedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: trimmedEmail });
    if (!user) return res.status(404).json({ msg: "Email not registered." });

    const otp = Math.floor(100000 + Math.random() * 900000);
    user.resetOTP = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: trimmedEmail,
      subject: "FOOD DADDA OTP Verification",
      html: `
        <div style="font-family:Arial; font-size:16px; color:#333;">
          <h2>Your OTP is: <strong>${otp}</strong></h2>
          <p>This OTP is valid for <strong>10 minutes</strong>. Do not share it with anyone.</p>
        </div>`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("✅ OTP sent to:", trimmedEmail);
      res.status(200).json({ msg: "OTP sent successfully." });
    } catch (emailErr) {
      console.error("❌ EMAIL SEND ERROR:", emailErr);
      res.status(500).json({ msg: "Failed to send OTP email." });
    }
  } catch (err) {
    console.error("FORGOT PASSWORD ERROR:", err.message);
    res.status(500).json({ msg: "Server error during forgot password." });
  }
};
