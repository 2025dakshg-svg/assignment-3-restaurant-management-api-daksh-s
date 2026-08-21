const MenuItem = require("../models/MenuItem");
const Restaurant = require("../models/Restaurant");

const getRestaurantMenu = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid restaurant ID format." });
    }
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    const menuItems = await MenuItem.find({ restaurantId: req.params.id });
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createMenuItem = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid restaurant ID format." });
    }
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    const { name, price, isAvailable } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ message: "Name and price are required." });
    }

    if (price < 0) {
      return res.status(400).json({ message: "Price cannot be negative." });
    }

    const menuItem = await MenuItem.create({
      restaurantId: req.params.id,
      name,
      price,
      isAvailable,
    });

    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid menu item ID format." });
    }

    const { name, price, isAvailable } = req.body;

    if (price !== undefined && price < 0) {
      return res.status(400).json({ message: "Price cannot be negative." });
    }

    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, price, isAvailable },
      { returnDocument: "after", runValidators: true }
    );

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid menu item ID format." });
    }
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    res.status(200).json({ message: "Menu item deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getRestaurantMenu, createMenuItem, updateMenuItem, deleteMenuItem };
