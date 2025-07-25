// foodroutes.js
const express = require("express");
const router = express.Router();

// ✅ Updated Dummy data with full info
const foods = [
  {
    id: 1,
    name: "Cheese Burst Pizza",
    price: 299,
    description: "Delicious pizza with extra cheese and fresh herbs.",
    image: "/images/cheese-pizza.jpg",
    reviews: [{ rating: 5 }, { rating: 4 }]
  },
  {
    id: 2,
    name: "Veggie Burger",
    price: 199,
    description: "A juicy veg patty served in soft buns with veggies and sauces.",
    image: "/images/veggie-burger.jpg",
    reviews: [{ rating: 4 }, { rating: 3 }, { rating: 4 }]
  },
  {
    id: 3,
    name: "Pasta Alfredo",
    price: 249,
    description: "Creamy white sauce pasta with fresh vegetables and cheese.",
    image: "/images/alfredo-pasta.jpg",
    reviews: [{ rating: 5 }, { rating: 5 }]
  }
];

// GET all foods
router.get("/", (req, res) => {
  res.json(foods);
});

// GET single food
router.get("/:id", (req, res) => {
  const food = foods.find(f => f.id === parseInt(req.params.id));
  if (!food) return res.status(404).json({ message: "Food not found" });
  res.json(food);
});

module.exports = router;
