import { useState } from "react";
import axios from "axios";
import bgImage from "/src/images/ForgetPass.jpg";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/forgot-password", {
        email,
      });
      setMessage("✅ Reset link sent! Please check your email.");
    } catch (err) {
      setMessage(err.response?.data || "❌ Something went wrong.");
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500">
    <div
      className="min-h-screen w-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative bg-transparent backdrop-md rounded-2xl shadow-2xl w-full max-w-md p-8 z-10 relative -top-[130px]">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <p className="text-white text-center mb-4">
            Enter your registered email to receive a reset link.
          </p>
          <div>
            <label className="block text-green-500 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold"
          >
            Send Reset Link
          </button>
        </form>

        {message && (
          <p className="text-center text-sm text-gray-700 mt-4">{message}</p>
        )}

        <div className="mt-6 text-center">
          <a
            href="/login"
            className="text-sm text-yellow-600 font-medium hover:underline"
          >
            Back to Sign In
          </a>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
