import React, { useContext, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { orders, currency, getUserOrders } = useContext(ShopContext);
  const navigate = useNavigate();

  // Fetch orders when component mounts
  useEffect(() => {
    getUserOrders();
  }, []);

  // Format date from timestamp
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get status color based on status text
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "processing":
        return "bg-gradient-to-r from-yellow-500 to-amber-500";
      case "shipped":
        return "bg-gradient-to-r from-blue-500 to-indigo-500";
      case "delivered":
        return "bg-gradient-to-r from-green-500 to-emerald-500";
      case "canceled":
        return "bg-gradient-to-r from-red-500 to-rose-500";
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col gap-1 sm:gap-10 pt-20 relative">
      {/* Background decorative elements */}
      <div className="absolute -right-16 top-1/4 w-80 h-80 bg-gradient-to-br from-violet-600/10 to-indigo-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -left-16 bottom-1/4 w-80 h-80 bg-gradient-to-tl from-indigo-600/10 to-fuchsia-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute left-1/3 top-0 w-64 h-64 bg-gradient-to-b from-fuchsia-500/10 to-violet-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="mb-8">
        <div className="relative">
          <span className="absolute -top-4 left-0 text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500 tracking-widest">
            YOUR HISTORY
          </span>
          <div className="relative inline-block">
            <Title text1="MY" text2="ORDERS" />
            <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-800 via-fuchsia-800 to-indigo-800"></div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-900/60 backdrop-blur-sm rounded-xl shadow-xl shadow-purple-900/20 overflow-hidden border border-purple-900/20 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/30"
            >
              <div className="p-5 border-b border-purple-900/20 bg-gradient-to-r from-gray-900/50 via-purple-950/50 to-indigo-950/50">
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <span className="text-sm text-gray-400">Order ID:</span>
                    <span className="ml-2 text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">
                      {order._id}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-400">Date:</span>
                    <span className="ml-2 text-sm text-gray-300">
                      {formatDate(order.date)}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-400">
                      Payment Method:
                    </span>
                    <span className="ml-2 text-sm font-medium">
                      {order.paymentMethod === "stripe" ? (
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                          Stripe
                        </span>
                      ) : (
                        <span className="text-gray-300">
                          {order.paymentMethod}
                        </span>
                      )}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-400">
                      Payment Status:
                    </span>
                    <span
                      className={`ml-2 text-sm font-medium ${
                        order.payment ? "text-green-400" : "text-amber-400"
                      }`}
                    >
                      {order.payment ? "Paid" : "Pending"}
                    </span>
                  </div>
                </div>
              </div>

              {order.items &&
                order.items.map((item, index) => (
                  <div
                    key={index}
                    className="p-6 flex flex-wrap md:flex-nowrap items-center gap-6 border-b border-purple-900/20 hover:bg-gradient-to-r hover:from-gray-900/30 hover:via-purple-950/30 hover:to-indigo-950/30 transition-colors duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="relative overflow-hidden rounded-lg shadow-md border border-purple-900/20">
                        <img
                          src={item.image || "/api/placeholder/120/160"}
                          alt={item.name}
                          className="w-20 h-28 object-cover rounded-lg transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-purple-500/10 rounded-lg"></div>
                      </div>
                    </div>

                    <div className="flex-grow min-w-0">
                      <h3 className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 truncate">
                        {item.name}
                      </h3>
                      <div className="mt-1 space-y-1 text-sm text-gray-400">
                        <p>
                          <span className="font-medium text-gray-300">
                            {currency}
                            {item.price.toFixed(2)}
                          </span>{" "}
                          &nbsp; Quantity: {item.quantity} &nbsp;
                          {item.size && `Size: ${item.size}`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <span
                          className={`w-3 h-3 ${getStatusColor(
                            order.status
                          )} rounded-full mr-2 shadow-sm`}
                        ></span>
                        <span className="text-sm font-medium text-gray-300">
                          {order.status || "Order Placed"}
                        </span>
                      </div>

                      <button className="px-4 py-2 text-white bg-gradient-to-r from-violet-800 via-fuchsia-800 to-indigo-800 rounded-lg shadow-md hover:shadow-lg hover:shadow-purple-900/30 transition-all duration-300 text-sm">
                        Track Order
                      </button>

                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-violet-900/20 via-fuchsia-900/20 to-indigo-900/20">
                        <ChevronRight className="w-5 h-5 text-violet-400" />
                      </div>
                    </div>
                  </div>
                ))}

              <div className="px-6 py-4 flex flex-wrap justify-between items-center bg-gradient-to-r from-gray-900/50 via-purple-950/50 to-indigo-950/50">
                <div className="text-sm text-gray-400">
                  <p>
                    <span className="font-medium text-gray-300">
                      Shipping Address:
                    </span>{" "}
                    {`${order.address?.street}, ${order.address?.city}, ${order.address?.state}, ${order.address?.zipcode}, ${order.address?.country}`}
                  </p>
                </div>
                <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">
                  Total: {currency}
                  {order.amount.toFixed(2)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-gray-900/60 backdrop-blur-sm rounded-xl shadow-xl shadow-purple-900/20 border border-purple-900/20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-violet-900/20 via-fuchsia-900/20 to-indigo-900/20 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-violet-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
            <div className="text-xl font-medium mb-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">
              No orders found
            </div>
            <p className="text-gray-400">You haven't placed any orders yet.</p>
            <button
              onClick={() => navigate("/collection")}
              className="mt-6 px-6 py-2 text-white bg-gradient-to-r from-violet-800 via-fuchsia-800 to-indigo-800 rounded-lg shadow-md hover:shadow-lg hover:shadow-purple-900/30 transition-all duration-300"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
