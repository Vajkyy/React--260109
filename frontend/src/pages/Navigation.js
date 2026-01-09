import React from "react";
import { NavLink } from "react-router";

export default function Navigation() {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li className="bold">
              <strong>SKILLSHARE ACADEMY</strong>
            </li>
          </ul>
          <ul>
            <li>
              <NavLink to="/dasboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/courses">Courses</NavLink>
            </li>
            <li>
              <NavLink to="/mentors">Mentors</NavLink>
            </li>
          </ul>
          <ul>
            <li>Welcome, {user.user.name ? user.user.name : "Guest"}</li>
            <li className="bold" onClick={logout}>
              Logout
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
