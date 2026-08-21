const express = require("express");
const router = express.Router();
const {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getTopRestaurants,
} = require("../controllers/restaurantController");
const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.get("/", getRestaurants);
router.get("/top", getTopRestaurants);
router.get("/:id", getRestaurantById);

// Protected routes (JWT required)
router.post("/", authMiddleware, createRestaurant);
router.put("/:id", authMiddleware, updateRestaurant);
router.delete("/:id", authMiddleware, deleteRestaurant);

module.exports = router;
