import React, { useState } from "react";
import { supabase } from "./supabaseClient"; // Supabase client setup
import { useNavigate } from "react-router-dom";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    if (validateForm()) {
      try {
        if (isLogin) {
          const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          });
          if (loginError) throw loginError;

          // Redirect to the dashboard
          navigate("/dashboard", { state: { username: formData.username } });
        } else {
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

          // Insert the user profile
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
      {/* The form UI (Login/Signup) remains the same */}
      {/* Only handling of redirection after login is updated */}
    </div>
  );
}

export default App;
