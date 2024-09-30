import React, { useState } from "react";
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
  const userId = location.state.userId;
  const username = location.state.username;

  // Handle profile update and gallery upload
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

  // Handle form input changes
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

          {/* Step 2: Gender and About Me */}
          {step === 2 && (
            <>
              <select
                name="gender"
                value={profileData.gender}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-800 text-white"
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Nonbinary">Nonbinary</option>
              </select>
              <textarea
                name="about_me"
                placeholder="Tell us about yourself"
                value={profileData.about_me}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-800 text-white"
              />
            </>
          )}

          {/* Step 3: Location and Looking For */}
          {step === 3 && (
            <>
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={profileData.location}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-800 text-white"
              />
              <input
                type="text"
                name="looking_for"
                placeholder="Looking For"
                value={profileData.looking_for}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-800 text-white"
              />
            </>
          )}

          {/* Step 4: Profession, Interests, Hobbies */}
          {step === 4 && (
            <>
              <input
                type="text"
                name="profession"
                placeholder="Profession"
                value={profileData.profession}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-800 text-white"
              />
              <input
                type="text"
                name="interests"
                placeholder="Interests"
                value={profileData.interests}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-800 text-white"
              />
              <input
                type="text"
                name="hobbies"
                placeholder="Hobbies"
                value={profileData.hobbies}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-800 text-white"
              />
            </>
          )}

          {/* Step 5: Education and Religion */}
          {step === 5 && (
            <>
              <input
                type="text"
                name="education"
                placeholder="Education"
                value={profileData.education}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-800 text-white"
              />
              <select
                name="religion"
                value={profileData.religion}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-800 text-white"
              >
                <option value="" disabled>Select Religion</option>
                <option value="Christianity">Christianity</option>
                <option value="Islam">Islam</option>
                <option value="Judaism">Judaism</option>
                <option value="Hinduism">Hinduism</option>
                <option value="Buddhism">Buddhism</option>
                <option value="Other">Other</option>
              </select>
            </>
          )}

          {/* Step 6: Smoking, Drinking, Spoken Languages */}
          {step === 6 && (
            <>
              <select
                name="smoking"
                value={profileData.smoking}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-800 text-white"
              >
                <option value="" disabled>Do you smoke?</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              <select
                name="drinking"
                value={profileData.drinking}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-800 text-white"
              >
                <option value="" disabled>Do you drink?</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              <input
                type="text"
                name="spoken_languages"
                placeholder="Spoken Languages"
                value={profileData.spoken_languages}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-800 text-white"
              />
            </>
          )}

          {/* Step 7: Profile Picture and Gallery Upload */}
          {step === 7 && (
            <>
              <label className="text-white">Profile Picture</label>
              <input
                type="file"
                name="profile_picture"
                accept="image/*"
                onChange={handleChange}
                className="w-full text-white"
              />
              <label className="text-white mt-4">Upload Gallery Images</label>
              <input
                type="file"
                name="gallery"
                accept="image/*"
                multiple
                onChange={handleChange}
                className="w-full text-white"
              />
            </>
          )}

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
