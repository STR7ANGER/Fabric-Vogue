import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";

const Verify = () => {
  const { token, clearCart, backendUrl } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        backendUrl + "/api/orders/verifyStripe",
        { success, orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        clearCart;
        navigate("/order");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div></div>;
};

export default Verify;
