import React from "react";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { FaListUl } from "react-icons/fa6";
import { BsBoxSeam } from "react-icons/bs";
import { IoMdArrowDropright } from "react-icons/io";

const SideBar = () => {
  return (
    <div className=" w-64 min-h-screen flex flex-col p-4">
      <nav>
        <ul>
          <li className="mb-4 flex items-center">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 w-full"
            >
              <IoHomeOutline size={20} />
              <span>Dashboard</span>
              <div className="flex-grow flex items-center justify-end">
                <IoMdArrowDropright size={20} />
              </div>
            </Link>
          </li>
          <li className="mb-4 flex items-center">
            <Link to="/category" className="flex items-center space-x-2 w-full">
              <BiCategoryAlt size={20} />
              <span>Category</span>
              <div className="flex-grow flex items-center justify-end">
                <IoMdArrowDropright size={20} />
              </div>
            </Link>
          </li>
          <li className="mb-4 flex items-center">
            <Link
              to="/subcategory"
              className="flex items-center space-x-2 w-full"
            >
              <FaListUl size={20} />
              <span>Subcategory</span>
              <div className="flex-grow flex items-center justify-end">
                <IoMdArrowDropright size={20} />
              </div>
            </Link>
          </li>
          <li className="mb-4 flex items-center">
            <Link to="/products" className="flex items-center space-x-2 w-full">
              <BsBoxSeam size={20} />
              <span>Products</span>
              <div className="flex-grow flex items-center justify-end">
                <IoMdArrowDropright size={20} />
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
