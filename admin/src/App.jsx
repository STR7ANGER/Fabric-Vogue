import React from "react";
import Navbar from "./componenets/Navbar";
import Sidebar from "./componenets/Sidebar";

const App = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <>
        <Navbar />
        <hr />
        <div className="flex w-full">
          <Sidebar />
        </div>
      </>
    </div>
  );
};

export default App;
