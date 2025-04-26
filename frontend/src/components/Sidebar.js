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
  favorites = [],
  toggleFavorite = () => {},
  isPropertyFavorite = () => false,
  className = '',
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
      const favorite = isPropertyFavorite(selectedProperty.id);

      // Show property details
      return (
        <div className="sidebar-section">
          <div className="sidebar-header">
            <h3 className="sidebar-title">House Information</h3>
            <div className="sidebar-actions">
              <button
                className={`favorite-button ${favorite ? 'active' : ''}`}
                onClick={() => toggleFavorite(selectedProperty)}
                title={favorite ? 'Remove from favorites' : 'Add to favorites'}
                aria-label={
                  favorite ? 'Remove from favorites' : 'Add to favorites'
                }
              >
                <i className={`fas fa-heart ${favorite ? 'active' : ''}`}></i>
              </button>
              <button
                className="close-button"
                onClick={() => onPropertySelect(null)}
                aria-label="Close property details"
              >
                ×
              </button>
            </div>
          </div>

          <img
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
            <button
              className="close-button"
              onClick={onClose}
              aria-label="Close sidebar"
            >
              ×
            </button>
          </div>

          {properties.map((property) => {
            const favorite = isPropertyFavorite(property.id);

            return (
              <div key={property.id} className="property-card">
                <img
                  src="/placeholder-property.jpg"
                  alt={property.address}
                  className="property-image"
                  onClick={() => onPropertySelect(property)}
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

                  <div className="property-actions">
                    <button
                      className="view-button"
                      onClick={() => onPropertySelect(property)}
                    >
                      View Details
                    </button>

                    <button
                      className={`favorite-button ${favorite ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(property);
                      }}
                      title={
                        favorite ? 'Remove from favorites' : 'Add to favorites'
                      }
                      aria-label={
                        favorite ? 'Remove from favorites' : 'Add to favorites'
                      }
                    >
                      <i
                        className={`fas fa-heart ${favorite ? 'active' : ''}`}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

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

  return <div className={`sidebar ${className}`}>{renderContent()}</div>;
};

export default Sidebar;
