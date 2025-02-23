import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(ShopContext);
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
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/register`,
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
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
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
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
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
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
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
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
            <div className="mt-2 text-sm text-right">
              <Link to="/login" className="text-gray-600 hover:text-black">
                Already have an account?
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
