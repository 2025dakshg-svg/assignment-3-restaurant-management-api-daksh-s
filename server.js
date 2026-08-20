const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const loggerMiddleware = require("./middleware/loggerMiddleware");
const authRoutes = require("./routes/authRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const menuRoutes = require("./routes/menuRoutes");

dotenv.config();

const app = express();

// Body parser middleware
app.use(express.json());

// Request logger middleware — runs for every request
app.use(loggerMiddleware);

// Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Restaurant Management API" });
});

app.use(authRoutes);
app.use("/restaurants", restaurantRoutes);
app.use(menuRoutes);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
