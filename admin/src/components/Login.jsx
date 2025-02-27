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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-slate-900 to-purple-900">
      <div className="relative backdrop-blur-sm rounded-xl border border-purple-900/20 shadow-xl shadow-purple-900/10 w-96 p-8">
        {/* Card background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-slate-900/90 to-purple-900/90 rounded-xl"></div>

        {/* Background decorative elements */}
        <div className="absolute -right-16 top-1/4 w-52 h-52 bg-gradient-to-br from-purple-600/10 to-indigo-600/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -left-16 bottom-1/4 w-52 h-52 bg-gradient-to-tl from-indigo-600/10 to-purple-600/10 rounded-full blur-3xl -z-10"></div>

        {/* Content container */}
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">
              Admin Panel
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 mx-auto mt-3 rounded-full"></div>
          </div>

          <form onSubmit={onSubmitHandler}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-gray-300 mb-2 text-sm"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  required
                  className="w-full p-3 bg-gray-800/50 border border-purple-900/30 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300"
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-300 mb-2 text-sm"
              >
                Password
              </label>
              <div className="relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  id="password"
                  placeholder="Password"
                  required
                  className="w-full p-3 bg-gray-800/50 border border-purple-900/30 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-violet-800 via-fuchsia-800 to-indigo-800 text-white rounded-lg font-medium tracking-wide shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 transition-all duration-300 hover:-translate-y-1"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
