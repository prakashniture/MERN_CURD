import express from 'express';
import { getSubcategories, addSubcategory, updateSubcategory, deleteSubcategory } from '../controllers/subcategoryController.js';

const router = express.Router();

router.get('/', getSubcategories);
router.post('/', addSubcategory);
router.put('/:id', updateSubcategory);
router.delete('/:id', deleteSubcategory);

export default router;
