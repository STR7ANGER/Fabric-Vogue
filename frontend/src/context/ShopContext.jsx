import { createContext, useState } from "react";
import { products } from "../assets/assets.js";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const deliveryFee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(null);  // Fixed initial state to null

  const addToCart = (itemID, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemID]) {
      if (cartData[itemID][size]) {
        cartData[itemID][size] += 1;
      } else {
        cartData[itemID][size] = 1;
      }
    } else {
      cartData[itemID] = { [size]: 1 };
    }
    setCartItems(cartData);
  };

  const updateItemQuantity = (itemID, size, quantity) => {
    if (quantity < 0) {
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemID] && cartData[itemID][size]) {
      cartData[itemID][size] = quantity;
    }
    setCartItems(cartData);
  };

  const removeItem = (itemID, size) => {
    const updatedCart = { ...cartItems };
    if (updatedCart[itemID] && updatedCart[itemID][size]) {
      delete updatedCart[itemID][size];
      if (Object.keys(updatedCart[itemID]).length === 0) {
        delete updatedCart[itemID];
      }
      setCartItems(updatedCart);
    }
    setConfirmDelete(null);  // Close the modal after item removal
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      }
    }
    return totalCount;
  };

  const value = {
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    updateItemQuantity,
    getCartCount,
    confirmDelete,  // Provide the state for modal to use
    setConfirmDelete,  // Method to control modal
    removeItem, // Provide removeItem method
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
