const express = require("express");
const router = express.Router();
const {
  getRestaurantMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuController");
const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.get("/restaurants/:id/menu", getRestaurantMenu);

// Protected routes (JWT required)
router.post("/restaurants/:id/menu", authMiddleware, createMenuItem);
router.put("/menu/:id", authMiddleware, updateMenuItem);
router.delete("/menu/:id", authMiddleware, deleteMenuItem);

module.exports = router;
