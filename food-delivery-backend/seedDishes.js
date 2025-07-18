require("dotenv").config();
const mongoose = require("mongoose");
const Dish = require("./models/dishModel"); // make sure path is correct

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    const sampleDishes = [
      { name: "Paneer Tikka", price: 180, category: "Indian", image: "/images/paneer.jpg" },
      { name: "Veg Biryani", price: 160, category: "Biryani", image: "/images/biryani.jpg" },
      { name: "Margherita Pizza", price: 200, category: "Pizza", image: "/images/pizza.jpg" },
      { name: "Choco Lava Cake", price: 110, category: "Desserts", image: "/images/dessert.jpg" }
    ];

    await Dish.insertMany(sampleDishes);
    console.log("🍕 Sample dishes inserted!");

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Seeding error:", err);
    mongoose.disconnect();
  });
