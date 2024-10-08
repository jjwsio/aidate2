import React, { useState } from "react";
import { supabase } from "./supabaseClient"; // Supabase client setup

function App() {
  const [isLogin, setIsLogin] = useState(false); // Toggle between login/signup
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.username && !isLogin) newErrors.username = "Username is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword && !isLogin)
      newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Form submission for login/signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    if (validateForm()) {
      try {
        if (isLogin) {
          // Handle login
          const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          });
          if (loginError) throw loginError;

          // Login successful (you can now add your dashboard navigation here)
          console.log("Login successful:", loginData);
          alert("Login successful! You are logged in.");
        } else {
          // Handle signup
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
          });

          if (signUpError) {
            if (signUpError.message.includes("User already registered")) {
              setErrors({ form: "User already exists. Please log in instead." });
              return;
            } else {
              throw signUpError;
            }
          }

          // Insert the new user data into the profiles table
          const { error: profileError } = await supabase.from("profiles").insert([
            { id: signUpData.user.id, username: formData.username },
          ]);

          if (profileError) throw profileError;

          setIsLogin(true); // Switch to login mode after signup
          alert("Sign up successful! You can now log in.");
        }
      } catch (error) {
        console.error("Error:", error.message);
        setErrors({ form: error.message });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-indigo-900 p-8 rounded-lg shadow-lg w-11/12 md:w-1/3 text-center">
        <h1 className="text-2xl font-semibold text-white mb-6">
          {isLogin ? "Login to Your Account" : "Sign Up for LoveDate"}
        </h1>

        {errors.form && <p className="text-red-500 text-sm mb-4">{errors.form}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-800 text-white"
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>
          )}

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-gray-800 text-white"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-gray-800 text-white"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

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

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-md font-medium hover:bg-purple-600 transition"
            disabled={loading}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setErrors({});
              setFormData({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
              });
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
