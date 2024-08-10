import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/forgot-password", { email });
      console.log("Reset password email sent", response.data);
    } catch (error) {
      console.error("Forgot password error", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Did you Forgot Password?</h1>
      <p>
        Enter your email address and we’ll send you a link to restore password
      </p>
      <form onSubmit={handleForgotPassword}>
        <div className="mb-4">
          <label className="block text-gray-700 pt-5">Email Address</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
