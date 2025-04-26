import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const CustomMarker = ({ property, onPropertySelect }) => {
  // Format price as currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Create custom icon based on property status
  const createCustomIcon = (property) => {
    const isActive = property.status === 'Active';
    const isPending = property.status === 'Pending';

    const iconUrl = isActive
      ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
      : isPending
      ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png'
      : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png';

    return new L.Icon({
      iconUrl,
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  };

  return (
    <Marker
      position={[property.latitude, property.longitude]}
      icon={createCustomIcon(property)}
      eventHandlers={{
        click: () => {
          onPropertySelect(property);
        },
      }}
    >
      <Popup>
        <div className="property-popup">
          <img
            src={property.imageUrl || 'https://via.placeholder.com/300x200'}
            alt={property.address}
            className="property-popup-image"
          />
          <div className="property-popup-price">
            {formatPrice(property.listPrice)}
          </div>
          <div className="property-popup-info">
            {property.bedrooms} bd | {property.bathrooms} ba |{' '}
            {property.squareFeet} sq ft
          </div>
          <div className="property-popup-address">{property.address}</div>
          <button
            className="property-popup-button"
            onClick={(e) => {
              e.stopPropagation();
              onPropertySelect(property);
            }}
          >
            View Details
          </button>
        </div>
      </Popup>
    </Marker>
  );
};

export default CustomMarker;
