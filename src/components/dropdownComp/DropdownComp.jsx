// DropdownComponent.js

import React, { useState } from "react";
import "./dropdownComp.css";

const DropdownComp = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdownHandeler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`dropdown ${isOpen ? "show" : ""}`}>
      <button className="toggle-btn" onClick={toggleDropdownHandeler}>
        All name and age
        <span className="arrow">&#9660;</span>
      </button>
      <div className="dropdown-content">
        {/* Dropdown content goes here */}
        {user.map((i, a) => (
          <p key={a}>
            Name: {i.employee_name}, Age: {i.employee_age}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DropdownComp;
