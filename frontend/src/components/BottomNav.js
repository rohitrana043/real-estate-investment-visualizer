import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = ({ activeMetric, onMetricChange, openSettings }) => {
  const location = useLocation();
  const isMapView = location.pathname === '/';

  return (
    <div className="bottom-nav">
      <Link
        to="/"
        className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
      >
        <i className="nav-icon fas fa-map-marked-alt"></i>
        <span>Map</span>
      </Link>

      {isMapView && (
        <>
          <a
            href="#overall"
            className={`nav-item ${activeMetric === 'overall' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onMetricChange('overall');
            }}
          >
            <i className="nav-icon fas fa-star"></i>
            <span>Overall</span>
          </a>

          <a
            href="#performance"
            className={`nav-item ${
              activeMetric === 'performance' ? 'active' : ''
            }`}
            onClick={(e) => {
              e.preventDefault();
              onMetricChange('performance');
            }}
          >
            <i className="nav-icon fas fa-chart-line"></i>
            <span>Performance</span>
          </a>

          <a
            href="#risk"
            className={`nav-item ${activeMetric === 'risk' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onMetricChange('risk');
            }}
          >
            <i className="nav-icon fas fa-exclamation-triangle"></i>
            <span>Risk</span>
          </a>

          <a
            href="#demand"
            className={`nav-item ${activeMetric === 'demand' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onMetricChange('demand');
            }}
          >
            <i className="nav-icon fas fa-users"></i>
            <span>Demand</span>
          </a>

          <a
            href="#supply"
            className={`nav-item ${activeMetric === 'supply' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onMetricChange('supply');
            }}
          >
            <i className="nav-icon fas fa-home"></i>
            <span>Supply</span>
          </a>
        </>
      )}

      <Link
        to="/dashboard"
        className={`nav-item ${
          location.pathname === '/dashboard' ? 'active' : ''
        }`}
      >
        <i className="nav-icon fas fa-chart-bar"></i>
        <span>Dashboard</span>
      </Link>

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
