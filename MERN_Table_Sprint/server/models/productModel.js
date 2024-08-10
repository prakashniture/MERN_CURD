import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subcategory: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
