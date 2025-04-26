import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ toggleSidebar, openSettings }) => {
  const location = useLocation();

  return (
    <div className="header">
      <div className="logo">
        <img src="/logo.png" alt="Property Investment Map Logo" />
        <span>iLocate</span>
      </div>

      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Map View
        </Link>
        <Link
          to="/dashboard"
          className={location.pathname === '/dashboard' ? 'active' : ''}
        >
          Dashboard
        </Link>
      </div>

      <div className="header-right">
        <span>Long-Term Inv | Toronto - GTA, ON | $0 | Unlimited</span>

        <button className="header-button" onClick={toggleSidebar}>
          <i className="fas fa-list"></i> List
        </button>

        <button className="header-button">
          <i className="fas fa-heart"></i> Favorites
        </button>

        <button className="header-button">
          <i className="fas fa-briefcase"></i> Portfolio
        </button>

        <button className="header-button">
          <i className="fas fa-flag"></i> Report
        </button>

        <button className="header-button" onClick={openSettings}>
          <i className="fas fa-cog"></i> Settings
        </button>
      </div>
    </div>
  );
};

export default Header;
