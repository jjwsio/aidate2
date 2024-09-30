import React, { useState } from "react";
import { supabase } from "./supabaseClient";

function App() {
  const [isLogin, setIsLogin] = useState(false); // To toggle between forms
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({}); // For validation errors

  // Form validation function
  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required.";
    if (!isLogin && !formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (!isLogin && formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-indigo-900 p-8 rounded-lg shadow-lg w-11/12 md:w-1/3 text-center">
        <h1 className="text-2xl font-semibold text-white mb-6">
          {isLogin ? "Login to Your Account" : "Sign Up for LoveDate"}
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-gray-800 text-white"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          {/* Email (only for signup) */}
          {!isLogin && (
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-800 text-white"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
          )}

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-gray-800 text-white"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password (only for signup) */}
          {!isLogin && (
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-800 text-white"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          {/* Remember me (only for login) */}
          {isLogin && (
            <div className="text-left">
              <label className="text-gray-400">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-md font-medium hover:bg-purple-600 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle between login and signup */}
        <p className="mt-6 text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setErrors({});
              setFormData({ username: "", email: "", password: "", confirmPassword: "" }); // Reset form
            }}
            className="text-purple-400 underline hover:text-purple-500"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default App;
