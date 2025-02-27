import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "./../App";
import { toast } from "react-toastify";
import { Package, ShoppingBag, RefreshCw } from "lucide-react";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const fetchAllOrders = async () => {
    // Get the latest token value directly from localStorage
    const currentToken = localStorage.getItem("token");

    if (!currentToken) {
      toast.error("Please login as admin");
      return null;
    }

    setLoading(true);
    try {
      const currentToken = localStorage.getItem("token");
      const response = await axios.post(
        `${backendUrl}/api/orders/list`,
        {},
        { headers: { token: currentToken } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      // Get fresh token value
      const currentToken = localStorage.getItem("token");
      if (!currentToken) {
        toast.error("Session expired. Please login again.");
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/orders/status`,
        { orderId, status: event.target.value },
        { headers: { token: currentToken } }
      );
      if (response.data.success) {
        toast.success("Order status updated");
        await fetchAllOrders();
      } else {
        toast.error(response.data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Special function to check if user is admin
  const checkAdminStatus = () => {
    const currentToken = localStorage.getItem("token");
    if (!currentToken) {
      toast.error("Please login first");
      return false;
    }

    // If you have a way to verify admin status client-side, you can add that here
    return true;
  };

  useEffect(() => {
    // Check admin status and fetch orders if admin
    if (checkAdminStatus()) {
      fetchAllOrders();
    }
  }, []);

  // Format date function
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="relative mt-20 mb-20 mx-4 md:mx-8">
      {/* Background decorative elements */}
      <div className="absolute -right-16 top-1/4 w-80 h-80 bg-gradient-to-br from-purple-600/10 to-indigo-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -left-16 bottom-1/4 w-80 h-80 bg-gradient-to-tl from-indigo-600/10 to-purple-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute left-1/3 top-0 w-64 h-64 bg-gradient-to-b from-fuchsia-500/10 to-purple-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-6xl mx-auto backdrop-blur-sm rounded-xl border border-purple-900/20 shadow-xl shadow-purple-900/10 p-8 relative">
        {/* Container background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-slate-900/90 to-purple-900/90 rounded-xl -z-10"></div>

        {/* Header section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">
              Admin Orders Dashboard
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 mt-3 rounded-full"></div>
          </div>

          <button
            onClick={fetchAllOrders}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-violet-800 via-fuchsia-800 to-indigo-800 text-white rounded-lg font-medium tracking-wide shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center gap-2"
          >
            <RefreshCw
              size={18}
              className={`${loading ? "animate-spin" : ""}`}
            />
            {loading ? "Loading..." : "Refresh Orders"}
          </button>
        </div>

        {loading ? (
          <div className="text-center py-16 bg-gray-900/30 rounded-lg">
            <div className="flex flex-col items-center justify-center">
              <RefreshCw
                size={40}
                className="text-gray-400 animate-spin mb-4"
              />
              <p className="text-gray-400">Loading orders...</p>
            </div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 bg-gray-900/30 rounded-lg">
            <div className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 font-medium mb-2">
              No orders found
            </div>
            <p className="text-gray-500">
              Orders will appear here once customers place them
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order, index) => (
              <div
                key={index}
                className="backdrop-blur-sm rounded-xl border border-purple-900/20 shadow-lg shadow-purple-900/10 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 relative"
              >
                {/* Card background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-slate-900/80 to-purple-900/80 rounded-xl -z-10"></div>

                {/* Order Info Section */}
                <div className="flex gap-4">
                  <div className="p-3 bg-gradient-to-r from-violet-900/30 via-fuchsia-900/30 to-indigo-900/30 rounded-lg flex items-center justify-center">
                    <Package size={28} className="text-purple-400" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-gray-300">
                      Order ID:{" "}
                      <span className="font-normal text-gray-400">
                        {order._id}
                      </span>
                    </p>
                    <p className="font-medium text-gray-300">Items:</p>
                    <div className="ml-2 text-sm text-gray-400">
                      {order.items &&
                        order.items.map((item, idx) => (
                          <p key={idx}>
                            {item.name} x {item.quantity}
                            {item.size && (
                              <span className="ml-1">({item.size})</span>
                            )}
                            {idx !== order.items.length - 1 && ","}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Customer Info Section */}
                <div className="space-y-2 text-sm">
                  <p className="font-medium text-gray-300">Customer Details:</p>
                  {order.address && (
                    <>
                      <p className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">
                        {order.address.firstName} {order.address.lastName}
                      </p>
                      <div className="text-gray-400">
                        <p>{order.address.street}</p>
                        <p>
                          {order.address.city}, {order.address.state},{" "}
                          {order.address.country}, {order.address.zipcode}
                        </p>
                        <p>Phone: {order.address.phone}</p>
                        <p>Email: {order.address.email}</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Order Details Section */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p className="text-gray-300">Items:</p>
                    <p className="text-gray-400">
                      {order.items ? order.items.length : 0}
                    </p>

                    <p className="text-gray-300">Payment Method:</p>
                    <p className="text-gray-400">{order.paymentMethod}</p>

                    <p className="text-gray-300">Payment Status:</p>
                    <p
                      className={
                        order.payment ? "text-green-400" : "text-orange-400"
                      }
                    >
                      {order.payment ? "Paid" : "Pending"}
                    </p>

                    <p className="text-gray-300">Order Date:</p>
                    <p className="text-gray-400">{formatDate(order.date)}</p>

                    <p className="text-gray-300">Total Amount:</p>
                    <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">
                      {currency} {order.amount?.toFixed(2)}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-purple-900/30">
                    <label
                      htmlFor={`status-${order._id}`}
                      className="block text-sm font-medium mb-2 text-gray-300"
                    >
                      Order Status:
                    </label>
                    <select
                      id={`status-${order._id}`}
                      onChange={(event) => statusHandler(event, order._id)}
                      value={order.status || "Order Placed"}
                      className="w-full p-3 bg-gray-800/50 border border-purple-900/30 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300"
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Processing">Processing</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
