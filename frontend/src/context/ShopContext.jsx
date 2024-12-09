import { createContext } from "react";
import { products } from "../assets/assets.js";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const dilivery_fee = 10;
  
  const value = {
    products,currency,dilivery_fee
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
