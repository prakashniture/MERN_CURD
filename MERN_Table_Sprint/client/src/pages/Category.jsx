import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import { RiAlertFill } from "react-icons/ri";
import axios from "axios";

const Category = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [newCategory, setNewCategory] = useState({
    _id: "",
    name: "",
    sequence: "",
    image: "",
    status: "Active",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = () => {
    resetNewCategory();
    setIsPopupOpen(true);
  };

  const handleEdit = (id) => {
    const categoryToEdit = categories.find((cat) => cat._id === id);
    setCurrentCategory(categoryToEdit);
    setNewCategory({
      _id: categoryToEdit._id,
      name: categoryToEdit.name,
      sequence: categoryToEdit.sequence,
      image: categoryToEdit.image,
      status: categoryToEdit.status,
    });
    setIsPopupOpen(true);
  };

  const handleSaveCategory = async () => {
    try {
      if (!newCategory.name || !newCategory.sequence) {
        console.error("Name or sequence is missing");
        return;
      }

      if (currentCategory) {
        const response = await axios.put(
          `http://localhost:5000/api/categories/${newCategory._id}`,
          newCategory
        );
        if (response.status === 200) {
          setCategories(
            categories.map((cat) =>
              cat._id === newCategory._id ? newCategory : cat
            )
          );
        }
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/categories",
          newCategory
        );
        if (response.status === 201) {
          setCategories([...categories, response.data]);
        }
      }
      resetNewCategory();
      setIsPopupOpen(false);
    } catch (err) {
      console.error("Error saving category", err);
    }
  };

  const handleDelete = (id) => {
    setCategoryToDelete(id);
    setIsDeletePopupOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/categories/${categoryToDelete}`
      );
      if (response.status === 200) {
        setCategories(categories.filter((cat) => cat._id !== categoryToDelete));
        setCategoryToDelete(null);
        setIsDeletePopupOpen(false);
      }
    } catch (error) {
      console.error(
        "Error deleting category:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const cancelDelete = () => {
    setCategoryToDelete(null);
    setIsDeletePopupOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setNewCategory((prev) => ({
        ...prev,
        image: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  const resetNewCategory = () => {
    setNewCategory({
      _id: "",
      name: "",
      sequence: "",
      image: "",
      status: "Active",
    });
    setCurrentCategory(null);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="items-center flex">
          <BiCategoryAlt size={20} />
          <b className="pl-2">Category</b>
        </div>
        <div className="flex items-center border border-gray-300 rounded">
          <input
            type="text"
            placeholder="Search Categories"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 outline-none"
          />
          <IoSearchOutline size={20} className="mr-2 text-gray-500" />
        </div>
        <button
          onClick={handleAddCategory}
          className="flex items-center bg-purple-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          <FaPlus size={16} className="mr-2" />
          Add Category
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-center">ID</th>
            <th className="py-2 px-4 border-b text-center">Category Name</th>
            <th className="py-2 px-4 border-b text-center">Image</th>
            <th className="py-2 px-4 border-b text-center">Status</th>
            <th className="py-2 px-4 border-b text-center">Sequence</th>
            <th className="py-2 px-4 border-b text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((category, index) => (
            <tr key={category._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b text-center">{index + 1}</td>
              <td className="py-2 px-4 border-b text-center">
                {category.name}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-12 h-12 mx-auto"
                />
              </td>
              <td
                className={`py-2 px-4 border-b text-center ${
                  category.status === "Active"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {category.status}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {category.sequence}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleEdit(category._id)}
                  className="text-blue-500 hover:underline"
                >
                  <FiEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="text-red-500 hover:underline ml-2"
                >
                  <FiTrash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Window for Adding/Editing Category */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">
              {currentCategory ? "Edit Category" : "Add Category"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveCategory();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-gray-700">Category Name</label>
                <input
                  type="text"
                  name="name"
                  value={newCategory.name}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Category Sequence</label>
                <input
                  type="number"
                  name="sequence"
                  value={newCategory.sequence}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1"
                />
                {newCategory.image && (
                  <div className="mt-2">
                    <img
                      src={newCategory.image}
                      alt="Category"
                      className="w-24 h-24 object-cover"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-gray-700">Status</label>
                <select
                  name="status"
                  value={newCategory.status}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsPopupOpen(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popup for Delete Confirmation */}
      {isDeletePopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center max-w-sm w-full">
            <div className="flex items-center justify-center mb-4">
              <RiAlertFill size={48} className="text-red-500 mr-4" />
              <div>
                <h2 className="text-xl font-bold mb-2 text-black">Delete</h2>
                <p className="text-black">Are you sure you want to delete?</p>
              </div>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-400"
              >
                Delete
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-xl hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
