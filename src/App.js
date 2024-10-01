import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-primary flex justify-center items-center">
      <div className="bg-secondary p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
        <div className="text-white text-4xl font-bold mb-4">
          <img src="/path-to-logo" alt="Logo" className="mx-auto mb-4" />
          LoveDate
        </div>

        <h2 className="text-white text-xl font-semibold mb-6">
          Single people in your area
        </h2>

        <div className="space-y-4">
          <button className="w-full py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
            I'm a Man 👨
          </button>
          <button className="w-full py-3 bg-pinkish text-white rounded-full hover:bg-pink-500 transition">
            I'm a Woman 👩
          </button>
          <button className="w-full py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition">
            Nonbinary 🧑‍🤝‍🧑
          </button>
        </div>

        <p className="text-white mt-4">
          Please answer a couple of questions to get a perfect match
        </p>

        <p className="text-white mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-blue-300 hover:underline">
            Login
          </a>
        </p>

        <footer className="mt-8">
          <div className="flex justify-center space-x-4 text-white text-sm">
            <a href="/home" className="hover:underline">Home</a>
            <a href="/features" className="hover:underline">Features</a>
            <a href="/group" className="hover:underline">Group</a>
            <a href="/about" className="hover:underline">About us</a>
            <a href="/contact" className="hover:underline">Contact us</a>
          </div>
          <p className="text-white text-xs mt-4">
            Copyright © 2024 LoveDate. All Rights Reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
