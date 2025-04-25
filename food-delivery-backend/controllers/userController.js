const User = require("../models/User");

// GET user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      email: req.body.email,
    };

    if (req.file) {
      updateData.profilePicture = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      updateData,
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
