import React, { useState } from 'react';
import '../styles/SignUp.css';

const SignUp = ({ onToggle, onLoginSuccess }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const onSubmitSignUp = async (e) => {
    try {
      e.preventDefault();
      setMessage('');

      const apiResponse = await fetch('http://localhost:3000/api/v1/auth/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userName: userName,
          email: email,
          password: password
        })
      });

      const data = await apiResponse.json();
      
      if (data.message) {
        setMessage(data.message);
      }
      
      if (data.message === "Email Registerd Sucessfully") {
        setUserName('');
        setEmail('');
        setPassword('');
        // Call the login success callback after successful registration
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      }
      
      console.log(data);
    } catch (err) {
      console.log(err);
      setMessage('Error during registration');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-glass-card">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={onSubmitSignUp} className="signup-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="signup-input"
              required
            />
          </div>
          
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signup-input"
              required
            />
          </div>
          
          <div className="input-group">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signup-input"
              required
            />
          </div>
          
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        
        {message && (
          <div className={`signup-message ${message.includes('Sucessfully') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
        
        <div className="toggle-link">
          Already have an account? 
          <button onClick={onToggle} className="toggle-link-btn">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
