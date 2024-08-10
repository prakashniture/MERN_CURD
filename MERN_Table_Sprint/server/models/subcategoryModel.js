import mongoose from 'mongoose';

const subcategorySchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String, required: true },
  categoryName: { type: String, required: true },
  sequence: { type: Number, required: true },
  image: { type: String },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
});

export default mongoose.model('Subcategory', subcategorySchema);
