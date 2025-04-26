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
import Portfolio from './components/Portfolio';
import Reports from './components/Reports';
import FavoritesModal from './components/FavoritesModal';
import MetricSelector from './components/MetricSelector';
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
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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

  // Add favorites state
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // Check if the screen is mobile-sized
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // On mobile, sidebar should be hidden by default
  useEffect(() => {
    if (isMobile) {
      setSidebarVisible(false);
    } else {
      setSidebarVisible(true);
    }
  }, [isMobile]);

  // Load settings and favorites from localStorage
  useEffect(() => {
    // Load settings
    const savedSettings = localStorage.getItem('propertyMapSettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setAppSettings(parsedSettings);

      // Apply theme
      document.body.className =
        parsedSettings.theme === 'dark' ? 'dark-theme' : '';
    }

    // Load favorites
    const savedFavorites = localStorage.getItem('propertyFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

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

  // Apply theme effect
  useEffect(() => {
    // Apply theme to body element
    if (appSettings.theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [appSettings.theme]);

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

  // Favorites functions
  const addToFavorites = (property) => {
    const updatedFavorites = [...favorites, property];
    setFavorites(updatedFavorites);
    localStorage.setItem('propertyFavorites', JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (propertyId) => {
    const updatedFavorites = favorites.filter((prop) => prop.id !== propertyId);
    setFavorites(updatedFavorites);
    localStorage.setItem('propertyFavorites', JSON.stringify(updatedFavorites));
  };

  const isPropertyFavorite = (propertyId) => {
    return favorites.some((prop) => prop.id === propertyId);
  };

  const toggleFavorite = (property) => {
    if (isPropertyFavorite(property.id)) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property);
    }
  };

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

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarVisible(false);
    }
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
    if (newSettings.theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }

    // Save settings to localStorage
    localStorage.setItem('propertyMapSettings', JSON.stringify(newSettings));
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
          isMobile={isMobile}
        />

        <MetricSelector
          activeMetric={activeMetric}
          onMetricChange={handleMetricChange}
        />

        <FilterBar
          activeMetric={activeMetric}
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

      {/* Sidebar overlay for mobile */}
      {isMobile && sidebarVisible && (
        <div
          className={`sidebar-overlay ${sidebarVisible ? 'visible' : ''}`}
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar with conditional classes for mobile animation */}
      {(sidebarVisible || !isMobile) && (
        <Sidebar
          properties={filteredProperties}
          selectedProperty={selectedProperty}
          onPropertySelect={handlePropertySelect}
          onClose={closeSidebar}
          locationScores={locationScores}
          activeMetric={activeMetric}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          isPropertyFavorite={isPropertyFavorite}
          className={isMobile ? 'visible' : ''}
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
          isMobile={isMobile}
        />
      )}
    </div>
  );

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
          openFavorites={() => setShowFavorites(true)}
          isMobile={isMobile}
        />

        <div className="content">
          <Routes>
            <Route path="/" element={<MapView />} />
            <Route path="/dashboard" element={<DashboardView />} />
            <Route
              path="/portfolio"
              element={<Portfolio isMobile={isMobile} />}
            />
            <Route path="/reports" element={<Reports isMobile={isMobile} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <BottomNav
          openSettings={() => setShowSettings(true)}
          openFavorites={() => setShowFavorites(true)}
        />

        <Settings
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          onSave={handleSettingsSave}
          initialSettings={appSettings}
        />

        <FavoritesModal
          isOpen={showFavorites}
          onClose={() => setShowFavorites(false)}
          favorites={favorites}
          onRemove={removeFromFavorites}
          onSelect={handlePropertySelect}
          locationScores={locationScores}
          isMobile={isMobile}
        />
      </div>
    </Router>
  );
}

export default App;
