// food-delivery-backend/routes/dishRoutes.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "🍽️ Dishes route is working" });
});

module.exports = router;
