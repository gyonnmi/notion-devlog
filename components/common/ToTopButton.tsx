import React from "react";
import { SlArrowUp } from "react-icons/sl";

const ToTopButton = () => {
  return (
    <button
      className="fixed font-bold rounded-xl bottom-8 right-8 text-pink-400 hover:bg-purple-200 p-4"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <SlArrowUp size={"1.5rem"} />
    </button>
  );
};

export default ToTopButton;
