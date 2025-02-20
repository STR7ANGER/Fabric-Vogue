import React from "react";
import axios from "axios";
import { useState } from "react";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
      });
      if (response.data.success) {
        toast.success("Login successful!");
        setToken(response.data.token);
        clearForm();
      } else {
        toast.error(response.data.message || "Invalid credentials");
        clearForm();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Invalid credentials");
      clearForm();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-center mb-6">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
              placeholder="Password"
              required
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-black text-white rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
