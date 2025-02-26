import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, backendUrl } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
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

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl || import.meta.env.VITE_BACKEND_URL}/api/user/register`,
        formData
      );

      if (response.data.sucess === true && response.data.token) {
        toast.success("Account created successfully!");
        navigate("/login");
      }

      if (response.data.sucess === false) {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Signup failed";
      toast.error(errorMessage);
      console.error("Signup error:", error);
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
            Create Account
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 mx-auto rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label htmlFor="name" className="block text-gray-300 mb-2 text-sm">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full p-3 bg-gray-800/70 border border-purple-900/30 text-gray-200 rounded-lg focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-colors"
              disabled={loading}
            />
          </div>

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
            <div className="flex justify-end mt-2 text-sm">
              <Link
                to="/login"
                className="text-gray-400 hover:text-violet-400 transition-colors"
              >
                Already have an account?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-gradient-to-r from-violet-800 via-fuchsia-800 to-indigo-800 text-white rounded-lg hover:shadow-lg hover:shadow-purple-900/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 font-medium mt-4"
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
                Creating Account...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-purple-900/20">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
