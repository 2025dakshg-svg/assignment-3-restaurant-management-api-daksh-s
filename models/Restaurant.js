const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Restaurant name is required"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "City is required"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    trim: true,
  },
  cuisine: {
    type: String,
    required: [true, "Cuisine type is required"],
    trim: true,
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: [0, "Rating must be at least 0"],
    max: [5, "Rating cannot exceed 5"],
  },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
