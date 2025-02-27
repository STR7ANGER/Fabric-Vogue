import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "./../App";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Product deleted successfully");
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="relative mt-20 mb-20 mx-4 md:mx-8">
      {/* Background decorative elements */}
      <div className="absolute -right-16 top-1/4 w-80 h-80 bg-gradient-to-br from-purple-600/10 to-indigo-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -left-16 bottom-1/4 w-80 h-80 bg-gradient-to-tl from-indigo-600/10 to-purple-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute left-1/3 top-0 w-64 h-64 bg-gradient-to-b from-fuchsia-500/10 to-purple-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto backdrop-blur-sm rounded-xl border border-purple-900/20 shadow-xl shadow-purple-900/10 p-8 relative">
        {/* Container background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-slate-900/90 to-purple-900/90 rounded-xl -z-10"></div>

        {/* Title section with gradients */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">
            All Products List
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 mt-3 rounded-full"></div>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-lg shadow-purple-900/10">
          <table className="min-w-full divide-y divide-purple-900/20">
            <thead className="bg-gradient-to-r from-gray-800/80 via-slate-800/80 to-purple-900/80">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/20">
              {list.map((product) => (
                <tr
                  key={product._id}
                  className="bg-gray-900/30 hover:bg-gradient-to-r hover:from-violet-900/20 hover:via-fuchsia-900/20 hover:to-indigo-900/20 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-indigo-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="h-16 w-16 object-cover rounded-lg relative z-10 border border-purple-900/30"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-300">
                      {product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      {product.category}
                    </div>
                    <div className="text-sm text-purple-400">
                      {product.subCategory}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 font-medium">
                      {currency}
                      {product.price}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-400 hover:text-red-300 transition-colors p-2 rounded-full hover:bg-red-900/20"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {list.length === 0 && (
            <div className="text-center py-16 text-gray-400 bg-gray-900/30 rounded-lg">
              <div className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 font-medium mb-2">
                No products found
              </div>
              <p className="text-gray-500">
                Add some products to see them listed here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
