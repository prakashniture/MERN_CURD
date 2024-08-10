import React from "react";
import logo from "../assets/logo.png";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img src={logo} alt="Logo" className="w-35 h-40 mb-4" />
      <h1 className="text-2xl font-bold">Welcome to TableSprint Admin</h1>
    </div>
  );
};

export default Dashboard;
