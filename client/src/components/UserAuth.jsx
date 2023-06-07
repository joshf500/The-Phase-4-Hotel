import React, { useState } from 'react';
import "../styles/Auth.css"

function UserAuth({ onLogin }) {
  const [activeForm, setActiveForm] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSwitchForm = (formType) => {
    setActiveForm(formType);
    setErrors([]);
  };

  const HandleAuthFormSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);

    let url;
    let requestData;

    if (activeForm === 'login') {
      url = '/login';
      requestData = { email, password };
    } else if (activeForm === 'signup') {
      url = '/signup';
      requestData = { email, password, password_confirmation: confirmPassword };
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          response.json().then((user) => onLogin(user));
        } else {
          response.json().then((err) => setErrors(err.errors));
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('An error occurred:', error);
      });
  };

  return (
    <section className="auth-forms-section">
      <h1 className="auth-section-title">your getaway awaits</h1>
      <div className="auth-forms">
        <div className={`auth-form-wrapper ${activeForm === 'login' ? 'is-active' : ''}`}>
          <button
            type="button"
            className="switcher auth-switcher-login"
            onClick={() => handleSwitchForm('login')}
          >
            Login
            <span className="auth-title-underline"></span>
          </button>
          <form className="AuthForm form-login" onSubmit={HandleAuthFormSubmit}>
            <fieldset>
              <legend>Please, enter your email and password for login.</legend>
              <div className="input-block">
                <label htmlFor="login-email">E-mail</label>
                <input 
                  id="login-email" // edit
                  type="email" required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-block">
                <label htmlFor="login-password">Password</label>
                <input 
                  placeholder="login-password" 
                  type="password" required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </fieldset>
            <button type="submit" className="btn-login" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            {errors.length > 0 && (
              <div className="error-messages">
                <ul>
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </form>
        </div>
        <div className={`auth-form-wrapper ${activeForm === 'signup' ? 'is-active' : ''}`}>
          <button
            type="button"
            className="switcher auth-switcher-signup"
            onClick={() => handleSwitchForm('signup')}
          >
            Sign Up
            <span className="auth-title-underline"></span>
          </button>
          <form className="AuthForm form-signup" onSubmit={HandleAuthFormSubmit}>
            <fieldset>
              <legend>Please, enter your email, password, and password confirmation for sign up.</legend>
              <div className="input-block">
                <label htmlFor="signup-email">E-mail</label>
                <input 
                  placeholder="signup-email"
                  type="email" required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />
              </div>
              <div className="input-block">
                <label htmlFor="signup-password">Password</label>
                <input 
                  placeholder="signup-password" 
                  type="password" required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input-block">
                <label htmlFor="signup-password-confirm">Confirm password</label>
                <input 
                  id="signup-password-confirm" 
                  type="password" required 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </fieldset>
            <button type="submit" className="-auth-btn-signup" disabled={isLoading}>
              {isLoading ? 'Signing up...' : 'Continue'}
            </button>
            {errors.length > 0 && (
              <div className="error-messages">
                <ul>
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default UserAuth;


