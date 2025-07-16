const express = require("express");
const router = express.Router();

// Dummy data
const foods = [
    { id: 1, name: "Burger", price: 100 },
    { id: 2, name: "Pizza", price: 250 },
    { id: 3, name: "Pasta", price: 150 }
];

// Get all foods
router.get("/", (req, res) => {
    res.json(foods);
});

// Get single food by ID
router.get("/:id", (req, res) => {
    const food = foods.find(f => f.id === parseInt(req.params.id));
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.json(food);
});

module.exports = router;