import React, { useState } from "react";
import SignUp from "./SignUp";
import "../styles/Auth.css";

function Login({ onLogin }) {
  const [activeForm, setActiveForm] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    let url;
    let requestData;

    if (activeForm === "login") {
      url = "/login";
      requestData = { username, password };
    } else if (activeForm === "signup") {
      url = "/signup";
      requestData = { username, password };
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((user) => {
            onLogin(user);
            setIsLoggedIn(true); // Update login status
          });
        } else {
          response.json().then((err) => setErrors(err.errors));
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  const handleClick = () => {
    setIsLoggedIn(true); // Update login status
  };

  return (
    <section className="auth-forms-section">
      <h1 className="auth-section-title">your getaway awaits</h1>
      <div className="auth-forms">
        <div className={`auth-form-wrapper ${activeForm === 'login' ? 'is-active' : ''}`}>
          <button
            type="button"
            className="switcher auth-switcher-login"
            onClick={() => setActiveForm('login')}
          >
            Login
            <span className="auth-title-underline"></span>
          </button>
          <form className="AuthForm form-login" onSubmit={handleSubmit}>
            <fieldset>
              <div className="input-block">
                <label htmlFor="login-username">Username</label>
                <input
                  id="login-username"
                  placeholder="Enter your username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-block">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  placeholder="Enter password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </fieldset>
            <button type="submit" className="btn-login" onClick={handleClick}>Login</button>
          </form>
        </div>
      </div>
      {isLoggedIn && <div>You are now logged in!</div>}
    </section>
  );
}

export default Login;
