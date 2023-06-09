/* 
import React, { useState } from "react";
import "../styles/Auth.css";

function SignUpForm({ onSignUp }) {
  const [activeForm, setActiveForm] = useState("signup");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      email,
      username,
      password,
    };

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((user) => {
            onSignUp(user);
            setIsRegistered(true); // Update registration status
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
    setIsRegistered(true); // Update registration status
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
          <form className="AuthForm form-signup" onSubmit={handleSubmit}>
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
            <button type="submit" className="btn-signup" onClick={handleClick}>Sign Up</button>
          </form>
        </div>
      </div>
      {isRegistered && <div>You are now registered!</div>}
    </section>
  );
}

export default SignUpForm;


*/