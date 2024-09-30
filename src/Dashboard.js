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
                  src="logo.png" // Add your logo path
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

      {/* Hero Section */}
      <section className="bg-purple-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Your people are here
              </h1>
              <p className="text-gray-600 mb-6">Let's get started</p>
              <form className="grid gap-4">
                <div>
                  <label className="block font-semibold mb-2">I am</label>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-white border rounded-md p-2 text-gray-900">
                      a woman
                    </button>
                    <button className="flex-1 bg-white border rounded-md p-2 text-gray-900">
                      a man
                    </button>
                    <button className="flex-1 bg-white border rounded-md p-2 text-gray-900">
                      nonbinary
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-2">I am looking for</label>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-white border rounded-md p-2 text-gray-900">
                      a woman
                    </button>
                    <button className="flex-1 bg-white border rounded-md p-2 text-gray-900">
                      a man
                    </button>
                    <button className="flex-1 bg-white border rounded-md p-2 text-gray-900">
                      nonbinary people
                    </button>
                  </div>
                </div>
                <button className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700">
                  Join now
                </button>
              </form>
            </div>
            <div className="lg:w-1/2">
              <img
                className="rounded-md shadow-lg"
                src="https://via.placeholder.com/600" // Replace with the appropriate image
                alt="Hero"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Highlight people */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Highlight people</h2>
          <div className="flex gap-4 overflow-x-scroll">
            {/* This is a horizontal scroll, can be a dynamic list */}
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Top members</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* Top members data */}
            {[
              { name: "Melinda", location: "Melbourne, Australia", age: 23 },
              { name: "Kristin", location: "Oregon, USA", age: 23 },
              { name: "Scott", location: "Minnesota, USA", age: 22 },
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

      {/* Interest Section */}
      <section className="bg-purple-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row">
          <div className="lg:w-1/2">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <p className="text-gray-700">You only live once</p>
              <p className="text-sm text-gray-500">Achieved 1 hour ago, 79 members</p>
              <button className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-full">
                Join group
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 ml-0 lg:ml-8 mt-8 lg:mt-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Find The Right Group That Fits Your Interests
            </h2>
            <p className="text-gray-700 mb-6">
              Connect with people who share your passions and interests.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Single",
                "In College",
                "Arts & Entertainment",
                "Music",
                "Tech",
                "Leo",
                "Libra",
                "Pizza",
              ].map((interest, index) => (
                <span
                  key={index}
                  className="bg-white border rounded-full px-4 py-2 text-sm text-gray-800"
                >
                  {interest}
                </span>
              ))}
            </div>
            <button className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700">
              Join community
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
