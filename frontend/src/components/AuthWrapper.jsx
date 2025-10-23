import React, { useState, useEffect } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import '../styles/common.css';

const AuthWrapper = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  // Show dashboard if logged in
  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />;
  }

  // Show auth forms if not logged in
  return (
    <div className="app-container">
      <div className="website-header">
        <h1 className="website-title">Second Brain</h1>
        <p className="website-subtitle">Your Personal Knowledge Management System</p>
      </div>
      
      {isSignUp ? 
        <SignUp 
          onToggle={() => setIsSignUp(false)} 
          onLoginSuccess={handleLoginSuccess} 
        /> : 
        <SignIn 
          onToggle={() => setIsSignUp(true)} 
          onLoginSuccess={handleLoginSuccess} 
        />
      }
    </div>
  );
};

export default AuthWrapper;
