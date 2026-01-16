import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../css/navigation.css";
import AuthContext from "../contexts/AuthContext";

export default function Navigation() {
  const { logout, user, loading } = useContext(AuthContext);

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
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/courses">Courses</NavLink>
            </li>
            <li>
              <NavLink to="/mentors">Mentors</NavLink>
            </li>
          </ul>
          <ul>
            <li>
              {loading
                ? "Loading..."
                : user
                ? `Welcome, ${user.name}`
                : "Guest"}
            </li>
            {user && (
              <li className="bold" onClick={logout}>
                Logout
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
}
