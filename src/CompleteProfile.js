import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "./supabaseClient";

function CompleteProfile() {
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState({
    display_name: "",
    age: "",
    gender: "",
    about_me: "",
    location: "",
    looking_for: "",
    profession: "",
    profile_picture: null, // For profile picture upload
    interests: "",
    hobbies: "",
    education: "",
    religion: "",
    smoking: "",
    drinking: "",
    spoken_languages: "",
    gallery: [], // For multiple image upload
  });
  const [progress, setProgress] = useState(0);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Get userId and username from the state
  const { userId, username } = location.state || {}; // Default to empty if missing

  // Handle case where userId or username is missing (prevent blank page)
  useEffect(() => {
    if (!userId || !username) {
      alert("Missing user data, redirecting to login...");
      navigate("/login"); // Redirect to login if data is missing
    }
  }, [userId, username, navigate]);

  const handleNext = async (e) => {
    e.preventDefault();
    if (step === 7) {
      try {
        // Handle Profile Picture upload
        if (profileData.profile_picture) {
          const profilePicUpload = await supabase.storage
            .from("profile-pictures")
            .upload(`${userId}/profile-pic`, profileData.profile_picture);

          if (profilePicUpload.error) throw profilePicUpload.error;
          profileData.profile_picture = profilePicUpload.data.Key;
        }

        // Handle Gallery Uploads
        const galleryUploadPromises = galleryFiles.map((file, index) =>
          supabase.storage.from("gallery").upload(`${userId}/gallery-${index}`, file)
        );
        const galleryUploadResults = await Promise.all(galleryUploadPromises);

        const galleryUrls = galleryUploadResults.map(
          (result) => result.data?.Key
        );

        profileData.gallery = galleryUrls;

        // Insert Profile Data into Supabase
        const { error } = await supabase
          .from("profiles")
          .update(profileData)
          .eq("id", userId);

        if (error) throw error;

        // Redirect to dashboard
        navigate("/dashboard", { state: { username } });
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    } else {
      setStep(step + 1);
      setProgress(progress + 16.66); // Progress bar updates by ~17% for each step
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_picture") {
      setProfileData({ ...profileData, profile_picture: files[0] });
    } else if (name === "gallery") {
      setGalleryFiles([...files]);
    } else {
      setProfileData({ ...profileData, [name]: value });
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-indigo-900 p-8 rounded-lg shadow-lg w-11/12 md:w-1/3 text-center">
        <h1 className="text-2xl font-semibold text-white mb-6">Complete Your Profile</h1>
        <div className="w-full bg-gray-300 rounded-full h-2.5 mb-4">
          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>

        <form onSubmit={handleNext} className="space-y-4">
          {/* Step 1: Display Name and Age */}
          {step === 1 && (
            <>
              <input
                type="text"
                name="display_name"
                placeholder="Display Name"
                value={profileData.display_name}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-800 text-white"
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={profileData.age}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-800 text-white"
              />
            </>
          )}

          {/* Add the rest of the form steps as in the previous solution... */}

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-md font-medium hover:bg-purple-600 transition"
          >
            {step === 7 ? "Finish" : "Next"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CompleteProfile;
