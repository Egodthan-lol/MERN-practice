import React from "react";

import Navbar from "./Navbar";

const NavBar = () => {
  return (
    <div className="navbar navbar-dark bg-dark navbar-expand-lg">
      <nav className="navbar navbar-expand-md">
        <div className="container">
          <div className="navbar-brand logo" />
          <Navbar />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;