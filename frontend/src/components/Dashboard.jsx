import React, { useState } from 'react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('youtube');

  const navigationItems = [
    { id: 'youtube', name: 'YouTube', icon: '📺' },
    { id: 'twitter', name: 'Twitter', icon: '🐦' },
    { id: 'facebook', name: 'Facebook', icon: '📘' },
    { id: 'github', name: 'GitHub', icon: '🐙' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'youtube':
        return (
          <div className="content-section">
            <h2>📺 YouTube Content</h2>
            <p>Manage your YouTube videos and playlists here.</p>
            <div className="content-grid">
              <div className="content-card">
                <h3>Video Title 1</h3>
                <p>Description of the video content...</p>
                <span className="content-tag">Tutorial</span>
              </div>
              <div className="content-card">
                <h3>Video Title 2</h3>
                <p>Description of the video content...</p>
                <span className="content-tag">Review</span>
              </div>
            </div>
          </div>
        );
      case 'twitter':
        return (
          <div className="content-section">
            <h2>🐦 Twitter Content</h2>
            <p>Manage your Twitter posts and threads here.</p>
            <div className="content-grid">
              <div className="content-card">
                <h3>Tweet Title 1</h3>
                <p>Description of the tweet content...</p>
                <span className="content-tag">Tech</span>
              </div>
              <div className="content-card">
                <h3>Tweet Title 2</h3>
                <p>Description of the tweet content...</p>
                <span className="content-tag">News</span>
              </div>
            </div>
          </div>
        );
      case 'facebook':
        return (
          <div className="content-section">
            <h2>📘 Facebook Content</h2>
            <p>Manage your Facebook posts and content here.</p>
            <div className="content-grid">
              <div className="content-card">
                <h3>Post Title 1</h3>
                <p>Description of the post content...</p>
                <span className="content-tag">Personal</span>
              </div>
              <div className="content-card">
                <h3>Post Title 2</h3>
                <p>Description of the post content...</p>
                <span className="content-tag">Business</span>
              </div>
            </div>
          </div>
        );
      case 'github':
        return (
          <div className="content-section">
            <h2>🐙 GitHub Content</h2>
            <p>Manage your GitHub repositories and code here.</p>
            <div className="content-grid">
              <div className="content-card">
                <h3>Repository 1</h3>
                <p>Description of the repository...</p>
                <span className="content-tag">JavaScript</span>
              </div>
              <div className="content-card">
                <h3>Repository 2</h3>
                <p>Description of the repository...</p>
                <span className="content-tag">Python</span>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a section from the navigation</div>;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Second Brain</h2>
        </div>
        <nav className="sidebar-nav">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>
      
      <div className="main-content">
        <div className="content-header">
          <h1>Welcome to Second Brain</h1>
          <p>Your personal knowledge management system</p>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
