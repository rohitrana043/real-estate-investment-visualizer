import React, { useEffect, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

// Fix for marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to track and preserve map view (zoom and center)
const MapViewController = ({ onViewChange }) => {
  const map = useMap();

  // Track map view changes
  useMapEvents({
    zoomend: () => {
      if (onViewChange) {
        onViewChange({
          center: map.getCenter(),
          zoom: map.getZoom(),
        });
      }
    },
    moveend: () => {
      if (onViewChange) {
        onViewChange({
          center: map.getCenter(),
          zoom: map.getZoom(),
        });
      }
    },
  });

  return null;
};

// Component to update the heatmap when data changes
const HeatmapLayer = ({ locationScores, activeMetric, showHeatmap }) => {
  const map = useMap();
  const heatLayerRef = useRef(null);

  useEffect(() => {
    // Remove existing heat layer if it exists
    if (heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current);
    }

    // Only create heatmap if showHeatmap is true
    if (showHeatmap) {
      // Get the score field based on activeMetric
      const getScoreValue = (score) => {
        switch (activeMetric) {
          case 'performance':
            return score.performanceScore;
          case 'risk':
            return score.riskScore;
          case 'demand':
            return score.demandScore;
          case 'supply':
            return score.supplyScore;
          default:
            return score.overallScore;
        }
      };

      // Create heat map data points with intensity
      const heatData = locationScores.map((score) => [
        score.latitude,
        score.longitude,
        getScoreValue(score) / 10, // Normalize to 0-1 range
      ]);

      // Create heat layer
      if (heatData.length > 0) {
        heatLayerRef.current = L.heatLayer(heatData, {
          radius: 25,
          blur: 15,
          maxZoom: 17,
          max: 1.0,
          gradient: { 0.4: 'blue', 0.65: 'yellow', 1: 'red' },
        }).addTo(map);
      }
    }

    return () => {
      if (heatLayerRef.current) {
        map.removeLayer(heatLayerRef.current);
      }
    };
  }, [map, locationScores, activeMetric, showHeatmap]);

  return null;
};

const InvestmentMap = ({
  properties,
  locationScores,
  activeMetric,
  onPropertySelect,
  selectedProperty,
  showHeatmap = true,
}) => {
  // Default center on Toronto-GTA area
  const defaultCenter = [43.6532, -79.3832];
  const defaultZoom = 14;

  // State to track current map view
  const [mapView, setMapView] = useState({
    center: defaultCenter,
    zoom: defaultZoom,
  });

  // Format price as currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getLegendTitle = () => {
    switch (activeMetric) {
      case 'performance':
        return 'Performance Score';
      case 'risk':
        return 'Risk Score';
      case 'demand':
        return 'Demand Score';
      case 'supply':
        return 'Supply Score';
      default:
        return 'Overall Score';
    }
  };

  const getMetricDescription = () => {
    switch (activeMetric) {
      case 'performance':
        return 'Cap rate, appreciation, ROI';
      case 'risk':
        return 'Market stability, price history';
      case 'demand':
        return 'Buyer interest, time on market';
      case 'supply':
        return 'Available inventory, new builds';
      default:
        return 'Combined investment metrics';
    }
  };

  return (
    <MapContainer center={mapView.center} zoom={mapView.zoom} className="map">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <HeatmapLayer
        locationScores={locationScores}
        activeMetric={activeMetric}
        showHeatmap={showHeatmap}
      />

      <MapViewController onViewChange={setMapView} />

      {properties.map((property) => (
        <Marker
          key={property.id}
          position={[property.latitude, property.longitude]}
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
                onClick={() => onPropertySelect(property)}
              >
                View Details
              </button>
            </div>
          </Popup>
        </Marker>
      ))}

      <div className="heat-map-legend">
        <div className="legend-title">{getLegendTitle()}</div>
        <div className="legend-subtitle">{getMetricDescription()}</div>
        <div className="legend-gradient"></div>
        <div className="legend-labels">
          <span>Lower</span>
          <span>Medium</span>
          <span>High</span>
        </div>
      </div>

      <div className="metric-badge">
        {activeMetric.charAt(0).toUpperCase() + activeMetric.slice(1)} Heat Map
      </div>
    </MapContainer>
  );
};

export default InvestmentMap;
