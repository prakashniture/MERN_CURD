import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { RiAlertFill } from "react-icons/ri";
import { BsBoxSeam } from "react-icons/bs";
import axios from "axios";

const Product = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [newProduct, setNewProduct] = useState({
    _id: "",
    name: "",
    subcategory: "",
    category: "",
    status: "Active",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    resetNewProduct();
    setIsPopupOpen(true);
  };

  const handleEdit = (id) => {
    const productToEdit = products.find((prod) => prod._id === id);
    setCurrentProduct(productToEdit);
    setNewProduct({
      _id: productToEdit._id,
      name: productToEdit.name,
      subcategory: productToEdit.subcategory,
      category: productToEdit.category,
      status: productToEdit.status,
    });
    setIsPopupOpen(true);
  };

  const handleSaveProduct = async () => {
    try {
      if (!newProduct.name || !newProduct.subcategory || !newProduct.category) {
        console.error("Name, subcategory, or category is missing");
        return;
      }

      let response;

      if (currentProduct) {
        response = await axios.put(
          `http://localhost:5000/api/products/${newProduct._id}`,
          newProduct
        );
        if (response.status === 200) {
          setProducts(
            products.map((prod) =>
              prod._id === newProduct._id ? response.data : prod
            )
          );
        } else {
          console.error(
            "Failed to update product, status code:",
            response.status
          );
        }
      } else {
        response = await axios.post(
          "http://localhost:5000/api/products",
          newProduct
        );
        if (response.status === 201) {
          setProducts((prevProducts) => [...prevProducts, response.data]);
        } else {
          console.error("Failed to add product, status code:", response.status);
        }
      }

      resetNewProduct();
      setIsPopupOpen(false);
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const handleDelete = (id) => {
    setProductToDelete(id);
    setIsDeletePopupOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/products/${productToDelete}`
      );
      if (response.status === 200) {
        setProducts(products.filter((prod) => prod._id !== productToDelete));
        setProductToDelete(null);
        setIsDeletePopupOpen(false);
      }
    } catch (error) {
      console.error(
        "Error deleting product:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const cancelDelete = () => {
    setProductToDelete(null);
    setIsDeletePopupOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const resetNewProduct = () => {
    setNewProduct({
      _id: "",
      name: "",
      subcategory: "",
      category: "",
      status: "Active",
    });
    setCurrentProduct(null);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="items-center flex">
          <BsBoxSeam size={20} className="text-gray-600 mr-2" />
          <b className="pl-2">Product</b>
        </div>
        <div className="flex items-center border border-gray-300 rounded">
          <input
            type="text"
            placeholder="Search Products"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 outline-none"
          />
          <IoSearchOutline size={20} className="mr-2 text-gray-500" />
        </div>
        <button
          onClick={handleAddProduct}
          className="flex items-center bg-purple-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          <FaPlus size={16} className="mr-2" />
          Add Product
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-center">ID</th>
            <th className="py-2 px-4 border-b text-center">Product Name</th>
            <th className="py-2 px-4 border-b text-center">Sub Category</th>
            <th className="py-2 px-4 border-b text-center">Category</th>
            <th className="py-2 px-4 border-b text-center">Status</th>
            <th className="py-2 px-4 border-b text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={product._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b text-center">{index + 1}</td>
              <td className="py-2 px-4 border-b text-center">{product.name}</td>
              <td className="py-2 px-4 border-b text-center">
                {product.subcategory}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {product.category}
              </td>
              <td
                className={`py-2 px-4 border-b text-center ${
                  product.status === "Active"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {product.status}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleEdit(product._id)}
                  className="text-blue-500 hover:underline"
                >
                  <FiEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-500 hover:underline ml-2"
                >
                  <FiTrash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Window for Adding/Editing Product */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">
              {currentProduct ? "Edit Product" : "Add Product"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveProduct();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Sub Category</label>
                <input
                  type="text"
                  name="subcategory"
                  value={newProduct.subcategory}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Category</label>
                <input
                  type="text"
                  name="category"
                  value={newProduct.category}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Status</label>
                <select
                  name="status"
                  value={newProduct.status}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    resetNewProduct();
                    setIsPopupOpen(false);
                  }}
                  className="bg-gray-300 py-2 px-4 rounded text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 py-2 px-4 rounded text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popup Window for Delete Confirmation */}
      {isDeletePopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <div className="flex items-center justify-center mb-4">
              <RiAlertFill size={48} className="text-red-500 mr-4" />
              <h2 className="text-lg font-bold">Delete</h2>
            </div>
            <p className="text-center mb-4">Are you sure you want to delete?</p>
            <div className="flex justify-center space-x-2 mt-4">
              <button
                onClick={cancelDelete}
                className="bg-gray-300 py-2 px-4 rounded-xl text-gray-700"
              >
                Delete
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 py-2 px-4 rounded-xl text-white"
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

export default Product;
