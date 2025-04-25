const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Sanitize input
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    console.log("SIGNUP REQUEST:", { name: trimmedName, email: trimmedEmail });

    const existingUser = await User.findOne({ email: trimmedEmail });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name: trimmedName, email: trimmedEmail, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: 'Signup successful' });
  } catch (err) {
    console.error("SIGNUP ERROR:", err.message);
    res.status(500).json({ error: 'Internal server error during signup' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Sanitize input
    const trimmedEmail = email.trim().toLowerCase();

    console.log("LOGIN REQUEST:", { email: trimmedEmail });

    const user = await User.findOne({ email: trimmedEmail });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    res.status(500).json({ error: 'Internal server error during login' });
  }
};
