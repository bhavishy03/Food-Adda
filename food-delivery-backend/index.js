console.log("🔥 Starting server...");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const addressRoutes = require('./routes/addressRoutes');
const dishRoutes = require("./routes/dishRoutes");

require("dotenv").config();

// ✅ Import routes
const userRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = 5000;

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // ✅ static serve

// ✅ Use Routes
app.use("/api/foods", foodRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); /// ✅ profile upload
app.use('/api/orders', orderRoutes);
app.use('/api/addresses', addressRoutes);

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err);
    process.exit(1); // stop server if DB fails
  });
console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);

app.use("/api/dishes", dishRoutes);
// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

