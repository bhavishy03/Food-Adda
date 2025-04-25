const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.get("/:userId", getUserProfile);
router.put("/:userId", upload.single("profilePicture"), updateUserProfile);

module.exports = router;
