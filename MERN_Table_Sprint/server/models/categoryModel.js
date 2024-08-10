import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  sequence: { type: Number, required: true },
  image: { type: String },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
