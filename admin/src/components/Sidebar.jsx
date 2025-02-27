import React from "react";
import { NavLink } from "react-router-dom";
import { Plus, Package, ShoppingBag } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen bg-gradient-to-b from-gray-900 via-slate-900 to-purple-950 border-r border-purple-900/30 shadow-lg shadow-purple-900">
      <div className="flex flex-col gap-4 pt-16 pl-[15%]">
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-l-lg transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-violet-900 via-fuchsia-900 to-indigo-900 border-r-2 border-r-purple-500 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 font-medium"
                : "text-gray-300 hover:bg-gradient-to-r hover:from-violet-900 hover:via-fuchsia-900 hover:to-indigo-900 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-violet-400 hover:via-fuchsia-400 hover:to-indigo-400"
            }`
          }
          to="/add"
        >
          <Plus size={20} className="text-white" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-l-lg transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-violet-900/50 via-fuchsia-900/50 to-indigo-900/50 border-r-2 border-r-purple-500 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 font-medium"
                : "text-gray-300 hover:bg-gradient-to-r hover:from-violet-900/20 hover:via-fuchsia-900/20 hover:to-indigo-900/20 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-violet-400 hover:via-fuchsia-400 hover:to-indigo-400"
            }`
          }
          to="/list"
        >
          <Package size={20} className="text-white" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-l-lg transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-violet-900/50 via-fuchsia-900/50 to-indigo-900/50 border-r-2 border-r-purple-500 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 font-medium"
                : "text-gray-300 hover:bg-gradient-to-r hover:from-violet-900/20 hover:via-fuchsia-900/20 hover:to-indigo-900/20 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-violet-400 hover:via-fuchsia-400 hover:to-indigo-400"
            }`
          }
          to="/orders"
        >
          <ShoppingBag size={20} className="text-white" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
