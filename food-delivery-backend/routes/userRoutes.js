const express = require("express");
const router = express.Router();
const User = require("../models/User");
const upload = require("../middlewares/upload");

router.get("/:id/orders", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user.orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// ✅ Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Update user with profile picture
router.put("/:id", upload.single("profilePicture"), async (req, res) => {
  try {
    const { name, email, address } = req.body;
    const updateData = { name, email, address };

    // ✅ If image uploaded, add to updateData
    if (req.file) {
      updateData.profilePicture = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true } // return updated document
    );

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update user" });
  }
});

module.exports = router;
