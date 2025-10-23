import React, { useState } from 'react';
import '../styles/SignIn.css';

const SignIn = ({ onToggle, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const onSubmitSignIn = async (e) => {
    try {
      e.preventDefault();
      setMessage('');

      console.log(email, password);

      const signin = await fetch('http://localhost:3000/api/v1/auth/signin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await signin.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        setMessage(data.message);
        setEmail('');
        setPassword('');
        // Call the login success callback
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        setMessage(data.message || 'Login failed');
      }

      console.log(data);
    } catch (err) {
      console.log(err);
      setMessage('Error during login');
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-glass-card">
        <h2 className="signin-title">Sign In</h2>
        <form onSubmit={onSubmitSignIn} className="signin-form">
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signin-input"
              required
            />
          </div>
          
          <div className="input-group">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signin-input"
              required
            />
          </div>
          
          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>
        
        {message && (
          <div className={`signin-message ${message.includes('Sucessfully') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
        
        <div className="toggle-link">
          Don't have an account? 
          <button onClick={onToggle} className="toggle-link-btn">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
