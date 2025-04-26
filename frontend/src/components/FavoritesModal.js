import React from 'react';

const FavoritesModal = ({
  isOpen,
  onClose,
  favorites,
  onRemove,
  onSelect,
  locationScores,
}) => {
  if (!isOpen) return null;

  // Format price as currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Find location score for the property
  const findLocationScore = (property) => {
    return locationScores.find((score) => score.address === property.address);
  };

  return (
    <div className="settings-modal-overlay">
      <div className="settings-modal">
        <div className="settings-header">
          <h2>Favorite Properties</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="settings-content">
          {favorites.length === 0 ? (
            <div className="no-favorites">
              <p>You don't have any favorite properties yet.</p>
              <p>
                Browse properties and click the heart icon to add them to your
                favorites.
              </p>
            </div>
          ) : (
            <div className="favorites-list">
              {favorites.map((property) => {
                const locationScore = findLocationScore(property);

                return (
                  <div key={property.id} className="property-card">
                    <img
                      src={
                        property.imageUrl ||
                        'https://via.placeholder.com/300x200'
                      }
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
                        {property.bedrooms} bd | {property.bathrooms} ba |{' '}
                        {property.squareFeet} sq ft
                      </div>

                      <div className="property-address">
                        {property.address}, {property.city}, {property.state}{' '}
                        {property.zipCode}
                      </div>

                      {locationScore && (
                        <div className="property-scores">
                          <div className="score-item">
                            <span>
                              Overall: {locationScore.overallScore}/10
                            </span>
                          </div>
                          <div className="score-item">
                            <span>
                              Cap Rate: {locationScore.capRate.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="property-actions">
                        <button
                          className="view-button"
                          onClick={() => {
                            onSelect(property);
                            onClose();
                          }}
                        >
                          <i className="fas fa-eye"></i> View
                        </button>

                        <button
                          className="remove-button"
                          onClick={() => onRemove(property.id)}
                        >
                          <i className="fas fa-trash"></i> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="settings-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;
