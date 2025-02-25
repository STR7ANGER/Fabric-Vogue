import React, { useContext, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { orders, currency, getUserOrders } = useContext(ShopContext);

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
        return "bg-gradient-to-r from-yellow-400 to-yellow-500";
      case "shipped":
        return "bg-gradient-to-r from-blue-400 to-blue-500";
      case "delivered":
        return "bg-gradient-to-r from-green-400 to-green-500";
      case "canceled":
        return "bg-gradient-to-r from-red-400 to-red-500";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-500";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col gap-1 sm:gap-10 pt-10 border-t relative">
      {/* Background decorative elements */}
      <div className="absolute -right-16 top-1/4 w-80 h-80 bg-gradient-to-br from-purple-600/10 to-indigo-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -left-16 bottom-1/4 w-80 h-80 bg-gradient-to-tl from-indigo-600/10 to-purple-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute left-1/3 top-0 w-64 h-64 bg-gradient-to-b from-pink-500/10 to-purple-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="mb-8">
        <div className="relative">
          <span className="absolute -top-4 left-0 text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 tracking-widest">
            YOUR HISTORY
          </span>
          <div className="relative inline-block">
            <Title text1={"MY"} text2={"ORDERS"} />
            <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900"></div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl shadow-purple-900/5 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/10"
            >
              <div className="p-5 border-b bg-gradient-to-r from-purple-900/5 via-indigo-800/5 to-blue-900/5">
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Order ID:</span>
                    <span className="ml-2 text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-indigo-800">
                      {order._id}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Date:</span>
                    <span className="ml-2 text-sm">
                      {formatDate(order.date)}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">
                      Payment Method:
                    </span>
                    <span className="ml-2 text-sm font-medium">
                      {order.paymentMethod === "stripe" ? (
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                          Stripe
                        </span>
                      ) : (
                        order.paymentMethod
                      )}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">
                      Payment Status:
                    </span>
                    <span
                      className={`ml-2 text-sm font-medium ${
                        order.payment ? "text-green-600" : "text-orange-600"
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
                    className="p-6 flex flex-wrap md:flex-nowrap items-center gap-6 border-b hover:bg-gradient-to-r hover:from-purple-900/5 hover:via-indigo-800/5 hover:to-blue-900/5 transition-colors duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="relative overflow-hidden rounded-lg shadow-md">
                        <img
                          src={item.image || "/api/placeholder/120/160"}
                          alt={item.name}
                          className="w-20 h-28 object-cover rounded-lg transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-lg"></div>
                      </div>
                    </div>

                    <div className="flex-grow min-w-0">
                      <h3 className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-indigo-800 truncate">
                        {item.name}
                      </h3>
                      <div className="mt-1 space-y-1 text-sm text-gray-500">
                        <p>
                          <span className="font-medium">
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
                        <span className="text-sm font-medium text-gray-600">
                          {order.status || "Order Placed"}
                        </span>
                      </div>

                      <button className="px-4 py-2 text-white bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 rounded-lg shadow-md hover:shadow-lg hover:shadow-purple-900/20 transition-all duration-300 text-sm">
                        Track Order
                      </button>

                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-900/10 via-indigo-800/10 to-blue-900/10">
                        <ChevronRight className="w-5 h-5 text-indigo-800" />
                      </div>
                    </div>
                  </div>
                ))}

              <div className="px-6 py-4 flex flex-wrap justify-between items-center bg-gradient-to-r from-purple-900/5 via-indigo-800/5 to-blue-900/5">
                <div className="text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Shipping Address:</span>{" "}
                    {`${order.address?.street}, ${order.address?.city}, ${order.address?.state}, ${order.address?.zipcode}, ${order.address?.country}`}
                  </p>
                </div>
                <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-indigo-800">
                  Total: {currency}
                  {order.amount.toFixed(2)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-xl shadow-xl shadow-purple-900/5">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-900/10 via-indigo-800/10 to-blue-900/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-indigo-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
            <div className="text-xl font-medium mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-indigo-800">
              No orders found
            </div>
            <p className="text-gray-600">You haven't placed any orders yet.</p>
            <button className="mt-6 px-6 py-2 text-white bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 rounded-lg shadow-md hover:shadow-lg hover:shadow-purple-900/20 transition-all duration-300">
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
