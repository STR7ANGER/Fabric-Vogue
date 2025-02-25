import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-pink-500">
        {text1}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 font-medium">
          {text2}
        </span>
      </p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gradient-to-r from-pink-500 to-purple-500"></p>
    </div>
  );
};

export default Title;
