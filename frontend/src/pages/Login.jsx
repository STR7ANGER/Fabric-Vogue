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
      const response = await axios.post(`${backendUrl}/api/user/login`, formData);
      const { success, token, userId, message } = response.data;

      if (success && token && userId) {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Welcome Back
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">
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
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1">
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
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              disabled={loading}
            />
            <div className="flex justify-between mt-2 text-sm">
              <Link
                to="/forgot-password"
                className="text-gray-600 hover:text-black"
              >
                Forgot password?
              </Link>
              <Link to="/signup" className="text-gray-600 hover:text-black">
                Create an account
              </Link>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-black text-white rounded hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;