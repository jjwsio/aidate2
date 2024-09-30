import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function CompleteProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, username } = location.state || {}; // Fallback in case state is missing

  useEffect(() => {
    console.log("CompleteProfile loaded");
    console.log("userId:", userId);
    console.log("username:", username);

    // Handle missing userId or username
    if (!userId || !username) {
      alert("Missing user data. Redirecting to login.");
      navigate("/");
    }
  }, [userId, username, navigate]);

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <h1 className="text-2xl text-white">Complete Your Profile</h1>
      <p className="text-white">User ID: {userId}</p>
      <p className="text-white">Username: {username}</p>
    </div>
  );
}

export default CompleteProfile;
