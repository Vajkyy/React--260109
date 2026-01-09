import React from "react";
import { NavLink } from "react-router ";

export default function LoginPage() {
  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};

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

    //ezt majd később a submit eseményben fogjuk frissíteni, ide pedig egy return jön.  return newErrors;
    return newErrors;
  }
  return (
    <div className="login">
      <h1>WELCOME BACK</h1>
      <form onClick={submit}>
        <div>
          <label htmlFor="email">EMAIL ADDRESS</label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            id="email"
          />
          {error.email && <span className="error-text">errors.email</span>}
        </div>
        <div>
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            value={password}
            placeholder="Enter your password"
            id="password"
          />
          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}
        </div>
        <div className="descript">
          Registration is free!{" "}
          <NavLink to="/register">CREATE AN ACCOUNT</NavLink>
        </div>
      </form>
    </div>
  );
}
