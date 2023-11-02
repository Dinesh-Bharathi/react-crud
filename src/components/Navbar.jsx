import React from "react";

function Navbar({ onAdd }) {
  return (
    <div className="navbar">
      <h1>CRUD SYSTEM</h1>
      <button className="btn" onClick={onAdd}>
        Add
      </button>
    </div>
  );
}

export default Navbar;
