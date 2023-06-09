import React, { useState } from "react";
import "../styles/Auth.css";

function UserAuth({ onSignUp, onLogin }) {
  const [activeForm, setActiveForm] = useState("signup");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSignUpSubmit = (e) => {
      e.preventDefault();
  /* signup */

      const SignUpData = {
        email,
        username,
        password,
      };

      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(SignUpData),
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((user) => {
              onSignUp(user);
              setIsRegistered(true); 
            });
          } else {
            response.json().then((err) => setErrors(err.errors));
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    };

    const handleSignUpClick = () => {
      setIsRegistered(true);
    };
  /* signup */

  /* login */
    const handleLoginSubmit = (e) => {
      e.preventDefault();

      let url;
      let LoginData;

      if (activeForm === "login") {
        url = "/login";
        LoginData = { username, password };
      } else if (activeForm === "signup") {
        url = "/signup";
        LoginData = { username, password };
      }

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(LoginData),
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

    const handleLoginClick = () => {
      setIsLoggedIn(true); // Update login status
    };
        


    return (
      <section className="auth-forms-section">
        <h1 className="auth-section-title">Join us today!</h1>
        <div className="auth-forms">
          <div className={`auth-form-wrapper ${activeForm === 'signup' ? 'is-active' : ''}`}>
            <button
              type="button"
              className="switcher auth-switcher-signup"
              onClick={() => setActiveForm('signup')}
            >
              Sign Up
              <span className="auth-title-underline"></span>
            </button>
            <form className="AuthForm form-signup" onSubmit={handleSignUpSubmit}>
              <fieldset>
                <div className="input-block">
                  <label htmlFor="signup-email">Email</label>
                  <input
                    id="signup-email"
                    placeholder="Enter your email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="signup-username">Username</label>
                  <input
                    id="signup-username"
                    placeholder="Enter your username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="signup-password">Password</label>
                  <input
                    id="signup-password"
                    placeholder="Enter password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="signup-confirm-password">Confirm Password</label>
                  <input
                    id="signup-confirm-password"
                    placeholder="Confirm password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </fieldset>
              <button type="submit" className="btn-signup" onClick={handleSignUpClick}>Sign Up</button>
            </form>

              
        <div> 
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
                        <form className="AuthForm form-login" onSubmit={handleLoginSubmit}>
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
                          <button type="submit" className="btn-login" onClick={handleLoginClick}>Login</button>
                        </form>
                      </div>
                    </div>
                    {isLoggedIn && <div>You are now logged in!</div>}
                  </section>
                </div>

            </div>
          </div>
          {isRegistered && <div>You are now registered!</div>}
        </section>
      );
    }

  export default UserAuth;
