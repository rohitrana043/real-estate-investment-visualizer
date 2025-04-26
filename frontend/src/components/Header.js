import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ toggleSidebar, openSettings, openFavorites, isMobile }) => {
  const location = useLocation();

  return (
    <div className="header">
      <div className="logo">
        <img src="/logo.png" alt="Property Investment Map Logo" />
        <span>iLocate</span>
      </div>

      {/* Nav links only shown on desktop */}
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
        <Link
          to="/portfolio"
          className={location.pathname === '/portfolio' ? 'active' : ''}
        >
          Portfolio
        </Link>
        <Link
          to="/reports"
          className={location.pathname === '/reports' ? 'active' : ''}
        >
          Reports
        </Link>
      </div>

      <div className="header-right">
        {/* Only show this text on desktop */}
        <span>Long-Term Inv | Toronto - GTA, ON | $0 | Unlimited</span>

        {/* List button triggers sidebar on mobile */}
        <button
          className="header-button"
          onClick={toggleSidebar}
          aria-label="Toggle property list"
        >
          <i className="fas fa-list"></i>
          {!isMobile && <span> List</span>}
        </button>
      </div>
    </div>
  );
};

export default Header;
