const Restaurant = require("../models/Restaurant");
const MenuItem = require("../models/MenuItem");

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getRestaurantById = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid restaurant ID format." });
    }
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createRestaurant = async (req, res) => {
  try {
    const { name, city, address, cuisine, rating } = req.body;

    if (!name || !city || !address || !cuisine || rating === undefined) {
      return res.status(400).json({
        message: "All fields are required (name, city, address, cuisine, rating).",
      });
    }

    if (rating < 0 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 0 and 5." });
    }

    const restaurant = await Restaurant.create({ name, city, address, cuisine, rating });
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateRestaurant = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid restaurant ID format." });
    }

    const { name, city, address, cuisine, rating } = req.body;

    if (rating !== undefined && (rating < 0 || rating > 5)) {
      return res.status(400).json({ message: "Rating must be between 0 and 5." });
    }

    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { name, city, address, cuisine, rating },
      { returnDocument: "after", runValidators: true }
    );

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid restaurant ID format." });
    }
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    await MenuItem.deleteMany({ restaurantId: req.params.id });

    res.status(200).json({ message: "Restaurant and its menu items deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getTopRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().sort({ rating: -1 }).limit(5);
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getTopRestaurants,
};
