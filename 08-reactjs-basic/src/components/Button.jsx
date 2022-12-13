import React from "react";

function Button({ labelButton, handleClick, typeButton }) {
  return (
    <>
      <button
        onClick={handleClick}
        type={typeButton}
        className="px-2  bg-blue-400 font-semibold text-xs rounded-xl text-white"
      >
        {labelButton}
      </button>
    </>
  );
}

export default Button;
