import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import NavBar from "./components/NavBar";
import SideBar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/Category";
import Subcategory from "./pages/Subcategory";
import Products from "./pages/Product";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <div className="flex flex-grow">
            <SideBar />
            <div className="flex-grow p-4">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/category"
                  element={
                    <ProtectedRoute>
                      <Category />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/subcategory"
                  element={
                    <ProtectedRoute>
                      <Subcategory />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/products"
                  element={
                    <ProtectedRoute>
                      <Products />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
