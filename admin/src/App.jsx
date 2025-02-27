import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Order from "./pages/Order";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gradient-to-tr from-purple-900 via-slate-900 to-gray-950 min-h-screen">
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <div className="min-h-screen flex flex-col">
          <Navbar setToken={setToken} />

          <div className="flex flex-1 w-full pt-16">
            <Sidebar />
            <div className="w-[82%] px-6 py-8 text-gray-300 text-base">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Order token={token} />} />
                <Route path="*" element={<Add token={token} />} />
              </Routes>
            </div>
          </div>

          {/* Background decorative elements */}
          <div className="fixed -right-32 top-1/4 w-96 h-96 bg-gradient-to-br from-purple-600/5 to-indigo-600/5 rounded-full blur-3xl -z-10"></div>
          <div className="fixed -left-32 bottom-1/4 w-96 h-96 bg-gradient-to-tl from-indigo-600/5 to-purple-600/5 rounded-full blur-3xl -z-10"></div>
          <div className="fixed left-1/3 top-0 w-80 h-80 bg-gradient-to-b from-fuchsia-500/5 to-purple-500/5 rounded-full blur-3xl -z-10"></div>
        </div>
      )}
    </div>
  );
};

export default App;
