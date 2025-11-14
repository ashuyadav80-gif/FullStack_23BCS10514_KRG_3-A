import React, { useEffect, useState } from "react";
import axios from "axios";
import bgImage from "/src/images/CustProfile.jpg";

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // token from login
        if (!token) {
          setError("No token found. Please log in again.");
          return;
        }
        axios.defaults.withCredentials = true;

        const response = await axios.get(
          "http://localhost:8080/api/customers/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile. Please log in again.");
      }
    };

    fetchProfile();
  }, []);

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
        {error}
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading profile...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col"
    style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Profile</h1>
          <a
            href="/dashboard"
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition"
          >
            Back to Dashboard
          </a>
        </div>
      </header>

      {/* Profile Card */}
      <main className="flex-grow flex justify-center items-center px-6 py-12">
        <div className="bg-white-10 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md">
          <div className="flex flex-col items-center">
            <img
              src="/src/images/CustLogo.jpg"
              alt="User avatar"
              className="w-24 h-24 rounded-full border-4 border-blue-500 mb-4"
            />
            <h2 className="text-2xl font-semibold text-blue-800">
              {user.fullName || "Unknown User"}
            </h2>
            <p className="text-gray-500">{user.email}</p>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-4 space-y-4">
            <div className="flex justify-between ">
              <span className="font-medium">Role:</span>
              <span>{user.role}</span>
            </div>
            <div className="flex justify-between ">
              <span className="font-medium">Joined On:</span>
              <span>{new Date(user.createdAt).toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
              Edit Profile
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 py-4 text-center text-gray-600 ">
        © {new Date().getFullYear()} Vehicle Service Booking System
      </footer>
    </div>
  );
}

export default Profile;
