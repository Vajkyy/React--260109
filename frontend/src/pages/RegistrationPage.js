import React from "react";

export default function RegistrationPage() {
  return (
    <div className="login">
      <h1>CREATE ACCOUNT</h1>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="name">FULL NAME</label>
          <input
            type="text"
            value={name}
            placeholder="Enter your full name"
            id="name"
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="email">EMAIL ADDRESS</label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            id="email"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            value={password}
            placeholder="Enter your password"
            id="password"
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>
        <div>
          <label htmlFor="cpassword">CONFIRM PASSWORD</label>
          <input
            type="cpassword"
            value={cpassword}
            placeholder="Confirm your password"
            id="cpassword"
          />
           {errors.cpassword && <span className="error-text">{errors.cpassword}</span>}
        </div>
        <div>
          <input type="submit" value="CREATE ACCOUNT" />
        </div>
        <div className="descript">
          Already have an account?
          <NavLink to="/login">SIGN IN HERE</NavLink>
        </div>
      </form>
    </div>
  );
}
