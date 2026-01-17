import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import "../css/login.css";
import {AuthContext} from "../contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login, serverError } = useContext(AuthContext);

  function validateForm() {
    const newErrors = {};

    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email address.";

    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6)
      newErrors.password = "Your password must be at least 6 characters long.";

    return newErrors;
  }

  function submit(event) {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    login({ email, password });
  }

  return (
    <div className="login">
      <h1>WELCOME BACK</h1>

      <form onSubmit={submit}>
        <div>
          <label htmlFor="email">EMAIL ADDRESS</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}
        </div>

        {/* Backend által visszaadott hiba */}
        {serverError && <span className="error-text">{serverError}</span>}

        <div className="descript">
          Registration is free!{" "}
          <NavLink to="/register">CREATE AN ACCOUNT</NavLink>
        </div>

        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
}
