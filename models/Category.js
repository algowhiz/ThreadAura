const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  image: { type: String, required: true },
  link: { type: String, required: true },
});

const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  items: { type: [itemSchema], required: true },
});

const categorySchema = new mongoose.Schema({
  mainCategory: { type: String, required: true },
  subcategories: { type: [subcategorySchema], required: true }
},{timestamps:true});

export default mongoose.models.Category || mongoose.model('Category', categorySchema);