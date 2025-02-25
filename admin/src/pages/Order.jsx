import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "./../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backend + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>order Page</h3>
      <div>
        {orders.map((order, index) => {
          <div key={index}>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span> ,
                      </p>
                    );
                  }
                })}
              </div>
              <p>{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    "," +
                    order.address.state +
                    "," +
                    order.address.country +
                    "," +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p>Items : {order.items.length}</p>
              <p>Method:{order.payMethod}</p>
              <p>Payment:{order.payment ? "Done" : "pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p>
              {currency} {order.amount}
            </p>
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Dilivery">Out for Dilivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>;
        })}
      </div>
    </div>
  );
};

export default Order;
