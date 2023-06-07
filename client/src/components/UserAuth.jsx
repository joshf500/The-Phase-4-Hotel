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

  const handleSubmit = (e) => {
    e.preventDefault();

    let url;
    let requestData;

    if (activeForm === 'login') {
      url = '/login'; 
      requestData = { username: email, password };
    } else if (activeForm === 'signup') {
      url = '/signup'; // Update with the correct endpoint
      requestData = { email, username: email, password, password_confirmation: confirmPassword };
    }

    fetch("/server/app.py", {
      method: 'POST',
      headers: {
        'Content-Type': '/server/app.py',
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
  };

  return (
        
        <div className={`auth-form-wrapper ${activeForm === 'signup' ? 'is-active' : ''}`}>
          <button
            type="button"
            className="switcher auth-switcher-signup"
            onClick={() => handleSwitchForm('signup')}
          >
            Sign Up
            <span className="auth-title-underline"></span>
          </button>
          <form className="AuthForm form-signup" onSubmit={handleSubmit}>
            <fieldset>
              <legend>Please, enter your email, password, and password confirmation for sign up.</legend>
              <div className="input-block">
                <label htmlFor="signup-email">E-mail</label>
                <input 
                  id="signup-email"
                  type="email" required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />
              </div>
              <div className="input-block">
                <label htmlFor="signup-password">Password</label>
                <input 
                  id="signup-password"
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
  );
}

export default UserAuth;
