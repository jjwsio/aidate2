import React from 'react';

function Dashboard() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <img
                  className="h-8 w-auto"
                  src="logo.png" // Add your logo path here
                  alt="LoveDate"
                />
              </div>
              <div className="hidden sm:-my-px sm:ml-10 sm:flex">
                <a href="#" className="ml-8 text-gray-900 hover:text-purple-500">
                  Home
                </a>
                <a href="#" className="ml-8 text-gray-900 hover:text-purple-500">
                  Community
                </a>
                <a href="#" className="ml-8 text-gray-900 hover:text-purple-500">
                  Page
                </a>
                <a href="#" className="ml-8 text-gray-900 hover:text-purple-500">
                  Contact Us
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <a
                href="#"
                className="text-gray-900 hover:text-purple-500 ml-4"
              >
                Sign In
              </a>
              <a
                href="#"
                className="ml-4 bg-purple-600 text-white px-3 py-1 rounded-full hover:bg-purple-700 transition"
              >
                Download our apps
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Highlight people */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Highlight People</h2>
          <div className="flex gap-4 overflow-x-scroll">
            {["Melinda", "Kristin", "John", "Javier"].map((person, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  className="w-16 h-16 rounded-full"
                  src={`https://via.placeholder.com/100?text=${person}`} // Replace with real profile images
                  alt={person}
                />
                <p className="text-gray-700 mt-2">{person}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Members */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Members</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: "Melinda", location: "Melbourne, Australia", age: 23 },
              { name: "Kristin", location: "Oregon, USA", age: 23 },
              { name: "Scott", location: "Minnesota, USA", age: 22 },
              { name: "Robin", location: "Ontario, Canada", age: 29 },
              { name: "Katherine", location: "Ontario, Canada", age: 24 },
            ].map((member, index) => (
              <div key={index} className="bg-white p-4 rounded-md shadow-lg">
                <img
                  className="w-full h-40 object-cover rounded-md"
                  src={`https://via.placeholder.com/300?text=${member.name}`} // Replace with real images
                  alt={member.name}
                />
                <h3 className="mt-4 text-lg font-bold">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.age} - {member.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why LoveDate */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why LoveDate?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-purple-100 p-4 rounded-lg text-center">
              <h3 className="text-lg font-bold text-purple-600">Awesome Community</h3>
              <p className="text-gray-700 mt-2">
                Join millions of active users sharing their stories and experiences.
              </p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg text-center">
              <h3 className="text-lg font-bold text-purple-600">Million Members</h3>
              <p className="text-gray-700 mt-2">
                We're growing daily. Be part of a vibrant and fast-growing community.
              </p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg text-center">
              <h3 className="text-lg font-bold text-purple-600">Trusted Groups</h3>
              <p className="text-gray-700 mt-2">
                Find people with similar interests and start new connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQs</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div>
              <h3 className="font-semibold text-lg text-gray-700">Why have my photos been moderated?</h3>
              <p className="text-gray-600 mt-2">
                Our moderation team ensures all content adheres to our community guidelines.
              </p>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg text-gray-700">How does messaging work?</h3>
              <p className="text-gray-600 mt-2">
                Messaging is simple, connect with users and start chatting today.
              </p>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg text-gray-700">What is LoveDate's Boost and Premium?</h3>
              <p className="text-gray-600 mt-2">
                Boost your profile for more visibility and join our premium membership for more features.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-6">Get started now!</h2>
          <form className="max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mb-4 rounded-md text-gray-900"
            />
            <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
              Get Started
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
