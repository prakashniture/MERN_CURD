import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import subcategoryRoutes from './routes/subcategoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import { authMiddleware } from './middleware/authMiddleware.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/products', productRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
