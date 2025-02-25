import express from "express";
import {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
} from "../controllers/orderController.js";
import authUser from "./../middleware/auth.js";
import adminAuth from "./../middleware/adminAuth.js";

const orderRouter = express.Router();

//admin
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

//payment
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);
orderRouter.post("/stripe", authUser, placeOrderStripe);

//user
orderRouter.post("/userorders", authUser, userOrders);

export default orderRouter;
