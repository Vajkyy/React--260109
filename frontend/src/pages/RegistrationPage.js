import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/registration.css";
import AuthContext from "../contexts/AuthContext";

export default function RegistrationPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [errors, setErrors] = useState({});
  const { register, serverError } = useContext(AuthContext);

  function validateForm() {
    const newErrors = {};

    if (!userName.trim()) {
      newErrors.userName = "Name is required.";
    }

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Your password must be at least 6 characters long.";
    }

    if (!cpassword) {
      newErrors.cpassword = "Confirm password is required.";
    } else if (password !== cpassword) {
      newErrors.cpassword = "Passwords do not match.";
    }

    return newErrors;
  }

  function submit(e) {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const user = {
      name: userName,
      email,
      password,
      cpassword,
    };

    console.log(user);
    register(user);
  }

  return (
    <div className="register">
      <h1>CREATE ACCOUNT</h1>

      <form onSubmit={submit}>
        <div>
          <label htmlFor="userName">NAME</label>
          <input
            id="userName"
            value={userName}
            placeholder="Enter your name"
            onChange={(e) => setUserName(e.target.value)}
          />
          {errors.userName && (
            <span className="error-text">{errors.userName}</span>
          )}
        </div>

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

        <div>
          <label htmlFor="cpassword">CONFIRM PASSWORD</label>
          <input
            type="password"
            id="cpassword"
            value={cpassword}
            placeholder="Confirm your password"
            onChange={(e) => setCpassword(e.target.value)}
          />
          {errors.cpassword && (
            <span className="error-text">{errors.cpassword}</span>
          )}
        </div>

        <div className="descript">
          Already have an account? <NavLink to="/login">LOGIN</NavLink>
        </div>

        <button type="submit">REGISTER</button>
      </form>
    </div>
  );
}
