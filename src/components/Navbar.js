import React from 'react';
import { Link } from 'react-router-dom';
import AuthNav from "./auth-nav";

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">ExcerTracker</Link>
      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/exercises" className="nav-link">Exercises</Link>
          </li>
          <li className="navbar-item">
            <Link to="/create" className="nav-link">Create Exercise Log</Link>
          </li>
          {/* <li className="navbar-item">
            <Link to="/user" className="nav-link">Create User</Link>
          </li> */}
        </ul>
        <AuthNav />
      </div>
    </nav>
  );
}