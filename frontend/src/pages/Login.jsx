import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setToken, backendUrl } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/user/login`,
        formData
      );
      const { success, token, userId, message, name } = response.data;

      if (success && token && userId) {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("name", name);
        setToken(token);
        setIsLoggedIn(true);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        toast.success(message || "Login successful!");
        navigate("/");
      } else {
        toast.error(message || "Login failed");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-[80vh] mt-20 px-4">
      {/* Background decorative elements */}
      <div className="absolute -right-16 top-1/4 w-80 h-80 bg-gradient-to-br from-violet-600/10 to-indigo-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -left-16 bottom-1/4 w-80 h-80 bg-gradient-to-tl from-indigo-600/10 to-fuchsia-600/10 rounded-full blur-3xl -z-10"></div>

      <div className="bg-gray-900/60 backdrop-blur-sm p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md border border-purple-900/20">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 mb-2">
            Welcome Back
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 mx-auto rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label htmlFor="email" className="block text-gray-300 mb-2 text-sm">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              className="w-full p-3 bg-gray-800/70 border border-purple-900/30 text-gray-200 rounded-lg focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-colors"
              disabled={loading}
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-gray-300 mb-2 text-sm"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full p-3 bg-gray-800/70 border border-purple-900/30 text-gray-200 rounded-lg focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-colors"
              disabled={loading}
            />
            <div className="flex justify-between mt-2 text-sm">
              <Link
                to="/forgot-password"
                className="text-gray-400 hover:text-violet-400 transition-colors"
              >
                Forgot password?
              </Link>
              <Link
                to="/signup"
                className="text-gray-400 hover:text-violet-400 transition-colors"
              >
                Create an account
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-gradient-to-r from-violet-800 via-fuchsia-800 to-indigo-800 text-white rounded-lg hover:shadow-lg hover:shadow-purple-900/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 font-medium"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-purple-900/20">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 font-medium hover:underline"
              >
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
