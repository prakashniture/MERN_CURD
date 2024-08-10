import Category from '../models/categoryModel.js';

const getNextId = async () => {
  const lastCategory = await Category.findOne().sort({ id: -1 });
  return lastCategory ? lastCategory.id + 1 : 1;
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addCategory = async (req, res) => {
  try {
    const { name, sequence, status, image } = req.body;
    const newCategory = new Category({ name, sequence, status, image });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      req.body,
      { new: true } 
    );

    if (!updatedCategory) return res.status(404).json({ message: 'Category not found' });

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) return res.status(404).json({ message: 'Category not found' });

    res.json({ message: 'Category deleted' });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

