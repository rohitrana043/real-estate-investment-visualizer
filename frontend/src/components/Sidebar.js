import React, { useState } from 'react';
import LocationScoreDisplay from './LocationScoreDisplay';
import PropertyFinancials from './PropertyFinancials';
import TorontoMetrics from './TorontoMetrics';

const Sidebar = ({
  properties,
  selectedProperty,
  onPropertySelect,
  onClose,
  locationScores,
  activeMetric,
}) => {
  const [activeTab, setActiveTab] = useState('opportunities');
  const [showTorontoMetrics, setShowTorontoMetrics] = useState(false);

  // Format price as currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Find location score for the address
  const findLocationScore = (address) => {
    return locationScores.find((score) => score.address === address);
  };

  // Render property list or selected property details
  const renderContent = () => {
    if (selectedProperty) {
      const locationScore = findLocationScore(selectedProperty.address);

      // Show property details
      return (
        <div className="sidebar-section">
          <div className="sidebar-header">
            <h3 className="sidebar-title">House Information</h3>
            <button
              className="close-button"
              onClick={() => onPropertySelect(null)}
            >
              ×
            </button>
          </div>

          <img
            // src={selectedProperty.imageUrl || '/placeholder-property.jpg'}
            src="/placeholder-property.jpg"
            alt={selectedProperty.address}
            className="property-image"
          />

          <div className="property-details">
            <div className="property-price">
              {formatPrice(selectedProperty.listPrice)}
              <span
                className={`property-status status-${selectedProperty.status.toLowerCase()}`}
              >
                {selectedProperty.status}
              </span>
            </div>

            <div className="property-info">
              {selectedProperty.bedrooms} beds | {selectedProperty.bathrooms}{' '}
              baths | {selectedProperty.squareFeet} sq ft
            </div>

            <div className="property-address">
              {selectedProperty.address}, {selectedProperty.city},{' '}
              {selectedProperty.state} {selectedProperty.zipCode}
            </div>

            <div className="property-description" style={{ marginTop: '16px' }}>
              {selectedProperty.description}
            </div>

            {locationScore && (
              <div style={{ marginTop: '24px' }}>
                <h4>Location Scores</h4>
                <LocationScoreDisplay
                  locationScore={locationScore}
                  activeMetric={activeMetric}
                />
              </div>
            )}

            <div style={{ marginTop: '24px' }}>
              <h4>Property Financial Estimates</h4>
              <PropertyFinancials property={selectedProperty} />
            </div>
          </div>
        </div>
      );
    } else {
      // Show property list
      return (
        <div className="sidebar-section">
          <div className="sidebar-header">
            <h3 className="sidebar-title">Opportunities</h3>
            <button className="close-button" onClick={onClose}>
              ×
            </button>
          </div>

          {properties.map((property) => (
            <div
              key={property.id}
              className="property-card"
              onClick={() => onPropertySelect(property)}
            >
              <img
                // src={selectedProperty.imageUrl || '/placeholder-property.jpg'}
                src="/placeholder-property.jpg"
                alt={property.address}
                className="property-image"
              />

              <div className="property-details">
                <div className="property-price">
                  {formatPrice(property.listPrice)}
                  <span
                    className={`property-status status-${property.status.toLowerCase()}`}
                  >
                    {property.status}
                  </span>
                </div>

                <div className="property-info">
                  {property.bedrooms} beds | {property.bathrooms} baths |{' '}
                  {property.squareFeet} sq ft
                </div>

                <div className="property-address">
                  {property.address}, {property.city}, {property.state}{' '}
                  {property.zipCode}
                </div>
              </div>
            </div>
          ))}

          {properties.length === 0 && (
            <div className="no-results">
              No properties found matching your filters.
            </div>
          )}

          <div
            className="gta-metrics-button"
            style={{ marginTop: '20px', textAlign: 'center' }}
          >
            <button
              className="btn btn-primary"
              onClick={() => setShowTorontoMetrics(!showTorontoMetrics)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {showTorontoMetrics ? 'Hide' : 'Show'} Toronto GTA Market Metrics
            </button>
          </div>

          {showTorontoMetrics && (
            <div
              className="toronto-metrics-container"
              style={{ marginTop: '20px' }}
            >
              <TorontoMetrics locationScores={locationScores} />
            </div>
          )}
        </div>
      );
    }
  };

  // For score display
  const renderLocationScoreSection = () => {
    if (!selectedProperty) return null;

    const locationScore = findLocationScore(selectedProperty.address);
    if (!locationScore) return null;

    return (
      <div className="sidebar-section">
        <div className="sidebar-header">
          <h3 className="sidebar-title">Location Scores</h3>
        </div>

        <LocationScoreDisplay
          locationScore={locationScore}
          activeMetric={activeMetric}
        />
      </div>
    );
  };

  return <div className="sidebar">{renderContent()}</div>;
};

export default Sidebar;
