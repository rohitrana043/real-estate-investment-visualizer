import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = ({ openSettings, openFavorites }) => {
  const location = useLocation();

  return (
    <div className="bottom-nav">
      <Link
        to="/"
        className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
      >
        <i className="nav-icon fas fa-map-marked-alt"></i>
        <span>Map</span>
      </Link>

      <Link
        to="/dashboard"
        className={`nav-item ${
          location.pathname === '/dashboard' ? 'active' : ''
        }`}
      >
        <i className="nav-icon fas fa-chart-bar"></i>
        <span>Dashboard</span>
      </Link>

      <Link
        to="/portfolio"
        className={`nav-item ${
          location.pathname === '/portfolio' ? 'active' : ''
        }`}
      >
        <i className="nav-icon fas fa-briefcase"></i>
        <span>Portfolio</span>
      </Link>

      <Link
        to="/reports"
        className={`nav-item ${
          location.pathname === '/reports' ? 'active' : ''
        }`}
      >
        <i className="nav-icon fas fa-flag"></i>
        <span>Reports</span>
      </Link>

      <a
        href="#favorites"
        className="nav-item"
        onClick={(e) => {
          e.preventDefault();
          if (openFavorites) openFavorites();
        }}
      >
        <i className="nav-icon fas fa-heart"></i>
        <span>Favorites</span>
      </a>

      <a
        href="#settings"
        className="nav-item"
        onClick={(e) => {
          e.preventDefault();
          openSettings();
        }}
      >
        <i className="nav-icon fas fa-cog"></i>
        <span>Settings</span>
      </a>
    </div>
  );
};

export default BottomNav;
