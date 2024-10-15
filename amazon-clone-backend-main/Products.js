// const mongoose = require("mongoose");

// const ProductSchema = mongoose.Schema({
//   title: String,
//   imageURL: String,
//   price: Number,
//   rating: Number,
// });

// module.exports = mongoose.model("products", ProductSchema);
const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  title: { type: String, required: true },
  imageURL: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
});

module.exports = mongoose.model("products", ProductSchema);
