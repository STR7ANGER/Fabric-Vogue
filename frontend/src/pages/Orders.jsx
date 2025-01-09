import React, { useContext } from 'react';
import { ChevronRight } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

const Orders = () => {
  const { orders, currency } = useContext(ShopContext);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-gray-900">MY ORDERS</h1>
        <div className="w-12 h-0.5 bg-gray-900 mt-2"></div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm">
            {order.items.map((item, index) => (
              <div key={index} className="p-6 flex items-center gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-32 object-cover rounded"
                  />
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <div className="mt-1 space-y-1 text-sm text-gray-500">
                    <p>
                      {currency}{item.price} &nbsp; 
                      Quantity: {item.quantity} &nbsp; 
                      Size: {item.size}
                    </p>
                    <p>Date: {order.date}</p>
                    {order.appliedCoupon && (
                      <p>Coupon Applied: {order.appliedCoupon}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-sm text-gray-600">{item.status}</span>
                  </div>
                  
                  <button className="px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded transition-colors">
                    Track Order
                  </button>

                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
            
            <div className="px-6 pb-6 flex justify-between border-t pt-4 mt-2">
              <div className="text-sm text-gray-600">
                Payment Method: {order.paymentMethod.toUpperCase()}
              </div>
              <div className="text-sm font-medium">
                Total: {currency}{order.orderDetails.total.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No orders found
        </div>
      )}
    </div>
  );
};

export default Orders;