import React, { useState, useEffect } from "react";
import { FaPlus, FaListUl } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { RiAlertFill } from "react-icons/ri";
import axios from "axios";

const Subcategory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [currentSubcategory, setCurrentSubcategory] = useState(null);
  const [subcategoryToDelete, setSubcategoryToDelete] = useState(null);
  const [newSubcategory, setNewSubcategory] = useState({
    name: "",
    categoryName: "",
    sequence: "",
    image: "",
    status: "Active",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/subcategories"
      );
      setSubcategories(response.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredSubcategories = subcategories.filter((subcategory) =>
    subcategory.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedSubcategories = [...filteredSubcategories].sort((a, b) =>
    a._id.localeCompare(b._id)
  );

  const handleAddOrUpdateSubcategory = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      if (newSubcategory.id) {
        const response = await axios.put(
          `http://localhost:5000/api/subcategories/${newSubcategory.id}`,
          newSubcategory,
          { headers }
        );
        setSubcategories(
          subcategories.map((sub) =>
            sub._id === newSubcategory.id ? response.data : sub
          )
        );
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/subcategories",
          newSubcategory,
          { headers }
        );
        setSubcategories([...subcategories, response.data]);
      }
      resetNewSubcategory();
      setIsPopupOpen(false);
    } catch (err) {
      console.error("Error saving subcategory", err);
    }
  };

  const handleEdit = (id) => {
    const subcategoryToEdit = subcategories.find((sub) => sub._id === id);
    setCurrentSubcategory(subcategoryToEdit);
    setNewSubcategory({
      ...subcategoryToEdit,
      image: subcategoryToEdit.image ? subcategoryToEdit.image : "",
    });
    setIsPopupOpen(true);
  };

  const handleDelete = (id) => {
    setSubcategoryToDelete(id);
    setIsDeletePopupOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      await axios.delete(
        `http://localhost:5000/api/subcategories/${subcategoryToDelete}`,
        { headers }
      );

      setSubcategories(
        subcategories.filter((sub) => sub._id !== subcategoryToDelete)
      );
      setSubcategoryToDelete(null);
      setIsDeletePopupOpen(false);
    } catch (err) {
      console.error("Error deleting subcategory", err);
    }
  };

  const cancelDelete = () => {
    setSubcategoryToDelete(null);
    setIsDeletePopupOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSubcategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setNewSubcategory((prev) => ({
        ...prev,
        image: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  const resetNewSubcategory = () => {
    setNewSubcategory({
      name: "",
      categoryName: "",
      sequence: "",
      image: "",
      status: "Active",
    });
    setCurrentSubcategory(null);
  };

  const statusColor = (status) => {
    return status === "Active" ? "text-green-500" : "text-red-500";
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="items-center flex">
          <FaListUl size={20} />
          <b className="pl-2">Subcategory</b>
        </div>
        <div className="flex items-center border border-gray-300 rounded">
          <input
            type="text"
            placeholder="Search Subcategories"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 outline-none"
          />
          <IoSearchOutline size={20} className="mr-2 text-gray-500" />
        </div>
        <button
          onClick={() => {
            resetNewSubcategory();
            setIsPopupOpen(true);
          }}
          className="flex items-center bg-purple-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          <FaPlus size={16} className="mr-2" />
          Add Subcategory
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-center">ID</th>
            <th className="py-2 px-4 border-b text-center">Subcategory Name</th>
            <th className="py-2 px-4 border-b text-center">Category Name</th>
            <th className="py-2 px-4 border-b text-center">Image</th>
            <th className="py-2 px-4 border-b text-center">Status</th>
            <th className="py-2 px-4 border-b text-center">Sequence</th>
            <th className="py-2 px-4 border-b text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedSubcategories.map((subcategory, index) => (
            <tr key={subcategory._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b text-center">{index + 1}</td>
              <td className="py-2 px-4 border-b text-center">
                {subcategory.name}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {subcategory.categoryName}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <img
                  src={subcategory.image}
                  alt={subcategory.name}
                  className="w-12 h-12 mx-auto"
                />
              </td>
              <td
                className={`py-2 px-4 border-b text-center ${statusColor(
                  subcategory.status
                )}`}
              >
                {subcategory.status}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {subcategory.sequence}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleEdit(subcategory._id)}
                  className="text-blue-500 hover:underline"
                >
                  <FiEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(subcategory._id)}
                  className="text-red-500 hover:underline ml-2"
                >
                  <FiTrash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Window for Adding/Editing Subcategory */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">
              {currentSubcategory ? "Edit Subcategory" : "Add Subcategory"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddOrUpdateSubcategory();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-gray-700">Subcategory Name</label>
                <input
                  type="text"
                  name="name"
                  value={newSubcategory.name}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Category Name</label>
                <input
                  type="text"
                  name="categoryName"
                  value={newSubcategory.categoryName}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Sequence</label>
                <input
                  type="number"
                  name="sequence"
                  value={newSubcategory.sequence}
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
                {newSubcategory.image && (
                  <div className="mt-2">
                    <img
                      src={newSubcategory.image}
                      alt="Subcategory Preview"
                      className="w-24 h-24 object-cover"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-gray-700">Status</label>
                <select
                  name="status"
                  value={newSubcategory.status}
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
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600"
                >
                  {currentSubcategory ? "Save Changes" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popup Window for Delete Confirmation */}
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
                className="bg-gray-300 text-black px-4 py-2 rounded-xl hover:bg-gray-400"
              >
                Delete
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-700"
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

export default Subcategory;
