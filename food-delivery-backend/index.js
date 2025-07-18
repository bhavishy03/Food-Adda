
// Load .env variables as early as possible
require("dotenv").config();

const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
const path     = require("path");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const addressRoutes = require('./routes/addressRoutes');
const dishRoutes = require("./routes/dishRoutes");

require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Import route modules
const authRoutes    = require("./routes/authRoutes");
const userRoutes    = require("./routes/userRoutes");
const foodRoutes    = require("./routes/foodRoutes");
const dishRoutes    = require("./routes/dishRoutes");
const orderRoutes   = require("./routes/orderRoutes");
const addressRoutes = require("./routes/addressRoutes");

const app  = express();
const PORT = process.env.PORT || 5000;

// ——————————————————————————————————————————————————————
// Middlewares
// ——————————————————————————————————————————————————————

app.use(cors());
app.use(express.json());


// Serve uploaded files
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// Health-check endpoint
app.get("/health", (req, res) => res.send("OK"));

// ——————————————————————————————————————————————————————
// API Routes
// ——————————————————————————————————————————————————————

app.use("/api/auth",     authRoutes);
app.use("/api/users",    userRoutes);
app.use("/api/foods",    foodRoutes);
app.use("/api/dishes",   dishRoutes);
app.use("/api/orders",   orderRoutes);
app.use("/api/addresses",addressRoutes);

// Catch-all 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// ——————————————————————————————————————————————————————
// MongoDB Connection + Server Start
// ——————————————————————————————————————————————————————

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB Error:", err);
    process.exit(1);
  });

app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
app.use("/api/foods", foodRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/addresses', addressRoutes);
app.use("/api/dishes", dishRoutes);

// ✅ MongoDB & Server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB Connected");
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB Error:", err);
  process.exit(1);
});

