import Subcategory from '../models/subcategoryModel.js';
import Counter from '../models/counterModel.js';

const getNextSequenceValue = async (sequenceName) => {
  const counter = await Counter.findByIdAndUpdate(
    sequenceName,
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return counter.sequence_value;
};

const initializeCounters = async () => {
  await Counter.findByIdAndUpdate(
    'subcategoryId',
    { sequence_value: 0 },
    { upsert: true }
  );
};

initializeCounters();

export const getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find();
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addSubcategory = async (req, res) => {
  try {
    const nextId = await getNextSequenceValue('subcategoryId');
    const newSubcategory = new Subcategory({
      id: nextId,
      ...req.body
    });
    const savedSubcategory = await newSubcategory.save();
    res.status(201).json(savedSubcategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSubcategory = await Subcategory.findOneAndUpdate(
      { id: Number(id) },
      req.body,
      { new: true }
    );
    if (!updatedSubcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    res.status(200).json(updatedSubcategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubcategory = await Subcategory.findByIdAndDelete(id);
    if (!deletedSubcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    res.status(200).json({ message: 'Subcategory deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};