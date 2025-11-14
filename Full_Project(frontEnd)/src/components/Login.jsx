import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
// import bgImage from "/src/images/IMG_4199.jpg"; 
import bgImage from "/src/images/SignIn.jpg"; 

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed: " + (err.response?.data || "Unknown error"));
    }
  };

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Semi-transparent overlay for contrast */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}

      <div className="relative bg-transparent backdrop-md rounded-2xl shadow-2xl w-full max-w-md p-8 z-10 ml-230">
      <h2 className="text-3xl font-bold text-white text-center mr-6">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-blue-200 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-blue-200 focus:ring-2 focus:ring-indigo-400 outline-none text-yellow-200"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-blue-200 font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none text-yellow-200"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold"
          >
            Sign In
          </button>
        </form>

        {/* Extra Links */}
        <div className="mt-6 text-center">
          <a
            href="/ForgetPassword"
            className="text-sm text-indigo-600 font-medium hover:underline block"
          >
            Forgot Password?
          </a>
          <p className="text-sm text-red-600 mt-2">
            Don’t have an account?{" "}
            <a
              href="/Signup"
              className="text-green-600 font-medium hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
