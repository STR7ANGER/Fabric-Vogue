import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-2xl md:text-3xl font-bold">
        <span className="text-violet-500">{text1}</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 font-medium ml-2">
          {text2}
        </span>
      </p>
      <div className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
    </div>
  );
};

export default Title;