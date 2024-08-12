import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../slices/authSlice";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // authentication logic
    dispatch(login({ email }));
    navigate("/dashboard");
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/forgot-password", { email });
      console.log("Reset password email sent", response.data);
    } catch (error) {
      console.error("Forgot password error", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm">
        {showForgotPassword ? (
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl mb-4 text-purple-500 text-center">Did you forgot password?</h2>
            <p className="mb-4">Enter your email address and we’ll send you a link to restore password</p>
            <form onSubmit={handleForgotPasswordSubmit}>
              <div className="mb-4">
                <label className="block text-sm  mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Send Reset Link
              </button>
              <p
                className="mt-4 underline text-center cursor-pointer text-blue-500"
                onClick={() => setShowForgotPassword(false)}
              >
                Back to Login
              </p>
            </form>
          </div>
        ) : (
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl mb-4 text-center">Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4 relative">
                <label className="block text-sm font-bold mb-2">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded pr-10"
                />
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ height: "145%" }}
                >
                  {showPassword ? (
                    <IoEyeOffOutline size={20} />
                  ) : (
                    <MdOutlineRemoveRedEye size={20} />
                  )}
                </span>
              </div>
              <p
                className="mb-4 text-right cursor-pointer text-blue-500"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot Password?
              </p>
              <button
                type="submit"
                className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700"
              >
                Login
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
