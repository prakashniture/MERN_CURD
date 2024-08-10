import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { RiAlertFill } from "react-icons/ri";
import { logout } from "../slices/authSlice";
import logo from "../assets/logo.png";

const NavBar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      setIsLogoutModalOpen(true);
    } else {
      navigate("/login");
    }
    setIsProfileOpen(false);
  };

  const confirmLogout = () => {
    dispatch(logout());
    setIsLogoutModalOpen(false);
    navigate("/");
  };

  const cancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="bg-purple-400 text-white flex justify-between items-center p-4 w-full">
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold">
          <img src={logo} alt="Logo" className="w-34 h-12 mr-2" />
        </Link>
      </div>
      <div className="relative">
        <button
          onClick={handleProfileToggle}
          className="flex items-center text-white"
        >
          <CgProfile size={24} />
        </button>
        {isProfileOpen && (
          <div className="absolute right-0 mt-2 bg-white text-black border border-gray-300 rounded shadow-lg">
            <button
              onClick={handleLoginLogout}
              className="block w-full px-4 py-2 text-left hover:bg-gray-200"
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </div>
        )}
      </div>

      {isLogoutModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center max-w-sm w-full">
            <div className="flex items-center justify-center mb-4">
              <RiAlertFill size={48} className="text-red-500 mr-4" />
              <div>
                <h2 className="text-xl font-bold mb-2 text-black">Log Out</h2>
                <p className="text-black">Are you sure you want to log out?</p>
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={cancelLogout}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
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

export default NavBar;
