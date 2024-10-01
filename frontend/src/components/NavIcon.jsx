import React, { useState } from "react";

const NavIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIcon = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-[60px]  ">
      <div
        id="nav-icon4"
        className={`w-15 h-[10px] relative my-12 mx-auto cursor-pointer transition-transform duration-500 ease-in-out ${
          isOpen ? "open" : ""
        }`}
        onClick={toggleIcon}
      >
        <span
          className={`block absolute h-[5px] w-[60px] bg-[#ffffff] rounded-full left-0 transition-transform duration-250 ease-in-out ${
            isOpen ? "transform rotate-[45deg] top-[-3px] left-[8px]" : "top-0"
          }`}
          style={{ transformOrigin: "left center" }}
        ></span>
        <span
          className={`block absolute h-[5px] w-[60px] bg-[#ffffff] rounded-full left-0 transition-transform duration-250 ease-in-out ${
            isOpen ? "w-0 opacity-0" : "top-[18px]"
          }`}
          style={{ transformOrigin: "left center" }}
        ></span>
        <span
          className={`block absolute h-[5px] w-[60px] bg-[#ffffff] rounded-full left-0 transition-transform duration-250 ease-in-out ${
            isOpen
              ? "transform rotate-[-45deg] top-[39px] left-[8px]"
              : "top-[36px]"
          }`}
          style={{ transformOrigin: "left center" }}
        ></span>
      </div>
    </div>
  );
};

export default NavIcon;
