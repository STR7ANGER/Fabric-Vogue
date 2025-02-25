import React, { useContext, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { ShopContext } from "../context/ShopContext";

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
        return "bg-yellow-500";
      case "shipped":
        return "bg-blue-500";
      case "delivered":
        return "bg-green-500";
      case "canceled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col gap-1 sm:gap-10 pt-10 border-t">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-gray-900">MY ORDERS</h1>
        <div className="w-12 h-0.5 bg-gray-900 mt-2"></div>
      </div>

      <div className="space-y-6">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-sm border"
            >
              <div className="p-4 border-b bg-gray-50">
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Order ID:</span>
                    <span className="ml-2 text-sm font-medium">
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
                      {order.paymentMethod}
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
                    className="p-6 flex flex-wrap md:flex-nowrap items-center gap-4 border-b"
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={item.image || "/api/placeholder/120/160"}
                        alt={item.name}
                        className="w-20 h-28 object-cover rounded"
                      />
                    </div>

                    <div className="flex-grow min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <div className="mt-1 space-y-1 text-sm text-gray-500">
                        <p>
                          {currency}
                          {item.price.toFixed(2)} &nbsp; Quantity:{" "}
                          {item.quantity} &nbsp;
                          {item.size && `Size: ${item.size}`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <span
                          className={`w-2 h-2 ${getStatusColor(
                            order.status
                          )} rounded-full mr-2`}
                        ></span>
                        <span className="text-sm text-gray-600">
                          {order.status || "Order Placed"}
                        </span>
                      </div>

                      <button className="px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded transition-colors">
                        Track Order
                      </button>

                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))}

              <div className="px-6 py-4 flex flex-wrap justify-between items-center">
                <div className="text-sm text-gray-600">
                  <p>
                    Shipping Address:{" "}
                    {`${order.address?.street}, ${order.address?.city}, ${order.address?.state}, ${order.address?.zipcode}, ${order.address?.country}`}
                  </p>
                </div>
                <div className="text-sm font-medium">
                  Total: {currency}
                  {order.amount.toFixed(2)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
            <div className="text-xl mb-2">No orders found</div>
            <p>You haven't placed any orders yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
