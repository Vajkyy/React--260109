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
              <Navlink to="/dasboard">Dashboard</Navlink>
            </li>
            <li>
              <Navlink to="/courses">Courses</Navlink>
            </li>
            <li>
              <Navlink to="/mentors">Mentors</Navlink>
            </li>
          </ul>

        </nav>
      </header>
    </div>
  );
}
