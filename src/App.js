import React from "react";
import { supabase } from "./supabaseClient";

function App() {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-indigo-900 p-8 rounded-lg shadow-lg w-11/12 md:w-1/3 text-center">
        <div className="mb-6">
          <img src="/logo.png" alt="LoveDate Logo" className="mx-auto w-12 h-12" />
          <h1 className="text-2xl font-semibold text-white mt-4">LoveDate</h1>
        </div>
        <h2 className="text-lg font-semibold text-white mb-6">
          Single people in your area
        </h2>
        <div className="space-y-4">
          <button className="w-full bg-purple-500 text-white py-2 rounded-md font-medium hover:bg-purple-600 transition">
            I'm a Man
          </button>
          <button className="w-full bg-pink-500 text-white py-2 rounded-md font-medium hover:bg-pink-600 transition">
            I'm a Woman
          </button>
          <button className="w-full bg-purple-300 text-white py-2 rounded-md font-medium hover:bg-purple-400 transition">
            Nonbinary
          </button>
        </div>
        <p className="text-sm text-gray-300 mt-4">
          Please answer a couple of questions to get a perfect match
        </p>
        <p className="mt-6 text-gray-400">
          Already have an account?{" "}
          <a href="/" className="text-purple-400 underline hover:text-purple-500">
            Login
          </a>
        </p>
      </div>
      <footer className="mt-10 text-center text-gray-400">
        <div className="space-x-4">
          <a href="/" className="hover:text-gray-200">Home</a>
          <a href="/" className="hover:text-gray-200">Features</a>
          <a href="/" className="hover:text-gray-200">Group</a>
          <a href="/" className="hover:text-gray-200">About us</a>
          <a href="/" className="hover:text-gray-200">Contact us</a>
        </div>
        <p className="mt-4 text-xs">Copyright © 2024 LoveDate. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
