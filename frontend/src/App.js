import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Header from './components/Header';
import InvestmentMap from './components/InvestmentMap';
import Sidebar from './components/Sidebar';
import FilterBar from './components/FilterBar';
import FilterDialog from './components/FilterDialog';
import BottomNav from './components/BottomNav';
import Settings from './components/Settings';
import InvestmentDashboard from './components/InvestmentDashboard';
// import SimpleDashboard from './components/SimpleDashboard';
import { fetchProperties, fetchLocationScores } from './services/api';

function App() {
  const [properties, setProperties] = useState([]);
  const [locationScores, setLocationScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [activeMetric, setActiveMetric] = useState('overall');
  const [filters, setFilters] = useState({
    bedrooms: 0,
    bathrooms: 0,
    sqftMin: 0,
    sqftMax: 10000,
    yearBuiltMin: 1900,
    yearBuiltMax: new Date().getFullYear(),
    showActive: true,
    showPending: true,
    city: 'Toronto', // Default to Toronto
  });
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [appSettings, setAppSettings] = useState({
    theme: 'light',
    currency: 'CAD',
    defaultCity: 'Toronto',
    showHeatmap: true,
    showAllGTA: false,
    dashboardView: 'compact',
    notifyNewListings: true,
    autoRefreshMinutes: 30,
  });

  // Load properties and location scores
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [propertiesData, locationScoresData] = await Promise.all([
          fetchProperties(),
          fetchLocationScores(),
        ]);
        setProperties(propertiesData);
        setLocationScores(locationScoresData);
        setError(null);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter properties based on current filters
  const filteredProperties = properties.filter((property) => {
    return (
      property.bedrooms >= filters.bedrooms &&
      property.bathrooms >= filters.bathrooms &&
      property.squareFeet >= filters.sqftMin &&
      property.squareFeet <= filters.sqftMax &&
      property.yearBuilt >= filters.yearBuiltMin &&
      property.yearBuilt <= filters.yearBuiltMax &&
      ((filters.showActive && property.status === 'Active') ||
        (filters.showPending && property.status === 'Pending')) &&
      (filters.city === 'All' || property.city === filters.city)
    );
  });

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
    setSidebarVisible(true);
  };

  const handleMetricChange = (metric) => {
    setActiveMetric(metric);
  };

  const toggleFilterDialog = () => {
    setShowFilterDialog(!showFilterDialog);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleSettingsSave = (newSettings) => {
    setAppSettings(newSettings);
    // Apply settings to the app
    if (
      newSettings.defaultCity !== filters.city &&
      newSettings.defaultCity !== 'All'
    ) {
      handleFilterChange({ city: newSettings.defaultCity });
    }

    // Apply theme
    document.body.className = newSettings.theme === 'dark' ? 'dark-theme' : '';
  };

  // Main map view component
  const MapView = () => (
    <>
      <div className="map-container">
        <InvestmentMap
          properties={filteredProperties}
          locationScores={locationScores}
          activeMetric={activeMetric}
          onPropertySelect={handlePropertySelect}
          selectedProperty={selectedProperty}
          showHeatmap={appSettings.showHeatmap}
        />

        <FilterBar
          activeMetric={activeMetric}
          onMetricChange={handleMetricChange}
          onFilterClick={toggleFilterDialog}
        />

        {showFilterDialog && (
          <FilterDialog
            filters={filters}
            onFilterChange={handleFilterChange}
            onClose={toggleFilterDialog}
          />
        )}
      </div>

      {sidebarVisible && (
        <Sidebar
          properties={filteredProperties}
          selectedProperty={selectedProperty}
          onPropertySelect={handlePropertySelect}
          onClose={() => setSidebarVisible(false)}
          locationScores={locationScores}
          activeMetric={activeMetric}
        />
      )}
    </>
  );

  // Dashboard view component
  const DashboardView = () => (
    <div className="dashboard-container">
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading data...</p>
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <InvestmentDashboard
          properties={properties}
          locationScores={locationScores}
          view={appSettings.dashboardView}
        />
      )}
    </div>
  );

  /**
  const DashboardView = () => (
    <div className="dashboard-container">
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading data...</p>
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <SimpleDashboard
          properties={properties}
          locationScores={locationScores}
        />
      )}
    </div>
  );
  */

  return (
    <Router>
      <div
        className={`app-container ${
          appSettings.theme === 'dark' ? 'dark-theme' : ''
        }`}
      >
        <Header
          toggleSidebar={toggleSidebar}
          openSettings={() => setShowSettings(true)}
        />

        <div className="content">
          <Routes>
            <Route path="/" element={<MapView />} />
            <Route path="/dashboard" element={<DashboardView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <BottomNav
          activeMetric={activeMetric}
          onMetricChange={handleMetricChange}
          openSettings={() => setShowSettings(true)}
        />

        <Settings
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          onSave={handleSettingsSave}
          initialSettings={appSettings}
        />
      </div>
    </Router>
  );
}

export default App;
