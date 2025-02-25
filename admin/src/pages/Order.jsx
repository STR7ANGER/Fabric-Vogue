import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "./../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

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
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Orders Dashboard</h1>
        <button
          onClick={fetchAllOrders}
          disabled={loading}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:bg-gray-400"
        >
          {loading ? "Loading..." : "Refresh Orders"}
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No orders found</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Order Info Section */}
              <div className="flex gap-4">
                <img
                  src={assets.parcel_icon}
                  alt="Order"
                  className="w-12 h-12 object-contain"
                />
                <div className="space-y-2">
                  <p className="font-medium">
                    Order ID: <span className="font-normal">{order._id}</span>
                  </p>
                  <p className="font-medium">Items:</p>
                  <div className="ml-2 text-sm text-gray-600">
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
                <p className="font-medium">Customer Details:</p>
                {order.address && (
                  <>
                    <p className="font-medium">
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <div className="text-gray-600">
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
                  <p>Items:</p>
                  <p>{order.items ? order.items.length : 0}</p>

                  <p>Payment Method:</p>
                  <p>{order.paymentMethod}</p>

                  <p>Payment Status:</p>
                  <p
                    className={
                      order.payment ? "text-green-600" : "text-orange-600"
                    }
                  >
                    {order.payment ? "Paid" : "Pending"}
                  </p>

                  <p>Order Date:</p>
                  <p>{formatDate(order.date)}</p>

                  <p>Total Amount:</p>
                  <p className="font-bold">
                    {currency} {order.amount?.toFixed(2)}
                  </p>
                </div>

                <div className="pt-3 border-t">
                  <label
                    htmlFor={`status-${order._id}`}
                    className="block text-sm font-medium mb-1"
                  >
                    Order Status:
                  </label>
                  <select
                    id={`status-${order._id}`}
                    onChange={(event) => statusHandler(event, order._id)}
                    value={order.status || "Order Placed"}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
  );
};

export default Order;
