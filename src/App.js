import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

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

  // Handle sign-up and login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    if (validateForm()) {
      try {
        if (isLogin) {
          // Handle Login
          const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          });
          if (loginError) throw loginError;

          const userId = loginData.user.id;

          // Fetch user profile
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select(
              `display_name, age, gender, about_me, location, looking_for, profession,
               profile_picture, interests, hobbies, education, religion, smoking, drinking, 
               spoken_languages, gallery`
            )
            .eq("id", userId)
            .single();

          if (profileError) throw profileError;

          // Check if the profile is incomplete (check each required field)
          const isProfileComplete =
            profileData.display_name &&
            profileData.age &&
            profileData.gender &&
            profileData.about_me &&
            profileData.location &&
            profileData.looking_for &&
            profileData.profession &&
            profileData.profile_picture &&
            profileData.interests &&
            profileData.hobbies &&
            profileData.education &&
            profileData.religion &&
            profileData.smoking !== null &&
            profileData.drinking !== null &&
            profileData.spoken_languages &&
            profileData.gallery && profileData.gallery.length > 0; // Ensure gallery has images

          // Redirect based on profile completeness
          if (isProfileComplete) {
            // Profile complete, redirect to dashboard
            navigate("/dashboard", { state: { username: profileData.display_name } });
          } else {
            // Profile incomplete, redirect to profile completion form
            // Redirect to complete profile form if the profile is incomplete
            navigate("/complete-profile", { state: { userId, username: profileData.display_name } });
          }
        } else {
          // Handle Signup
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

          const { error: profileError } = await supabase.from("profiles").insert([
            { id: signUpData.user.id, username: formData.username },
          ]);

          if (profileError) throw profileError;

          setIsLogin(true);
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

        {errors.form && (
          <p className="text-red-500 text-sm mb-4">{errors.form}</p>
        )}

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
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
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
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
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
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
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
