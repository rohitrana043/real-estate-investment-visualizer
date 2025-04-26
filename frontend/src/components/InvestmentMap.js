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
const MapViewController = ({
  onViewChange,
  selectedProperty,
  mapRef,
  activeMetric,
  isMobile,
}) => {
  const map = useMap();
  const prevMetricRef = useRef(activeMetric);
  const viewStateRef = useRef(null);

  // Store map reference
  useEffect(() => {
    mapRef.current = map;
  }, [map, mapRef]);

  // Track map view changes
  useMapEvents({
    zoomend: () => {
      // Save current view state
      viewStateRef.current = {
        center: map.getCenter(),
        zoom: map.getZoom(),
      };

      if (onViewChange) {
        onViewChange(viewStateRef.current);
      }
    },
    moveend: () => {
      // Save current view state
      viewStateRef.current = {
        center: map.getCenter(),
        zoom: map.getZoom(),
      };

      if (onViewChange) {
        onViewChange(viewStateRef.current);
      }
    },
  });

  // Effect to zoom to selected property
  useEffect(() => {
    if (selectedProperty && map) {
      // Fly to selected property with current zoom level or minimum of 15
      map.flyTo(
        [selectedProperty.latitude, selectedProperty.longitude],
        Math.max(map.getZoom(), 15), // Use current zoom or minimum of 15, whichever is higher
        {
          animate: true,
          duration: 1, // Fast animation
        }
      );
    }
  }, [selectedProperty, map]);

  // Effect to preserve zoom/center when metric changes
  useEffect(() => {
    if (prevMetricRef.current !== activeMetric && viewStateRef.current) {
      // Use a short timeout to ensure the view is restored after the metric change is processed
      const timeoutId = setTimeout(() => {
        if (map && viewStateRef.current) {
          map.setView(viewStateRef.current.center, viewStateRef.current.zoom, {
            animate: false,
          });
        }
      }, 50);

      return () => clearTimeout(timeoutId);
    }

    prevMetricRef.current = activeMetric;
  }, [activeMetric, map]);

  return null;
};

// Component to update the heatmap when data changes
const HeatmapLayer = ({
  locationScores,
  activeMetric,
  showHeatmap,
  mapRef,
}) => {
  const map = useMap();
  const heatLayerRef = useRef(null);
  const prevMetricRef = useRef(activeMetric);
  const viewStateRef = useRef(null);

  useEffect(() => {
    // Before changing heatmap layer, store current view state
    if (prevMetricRef.current !== activeMetric && map) {
      viewStateRef.current = {
        center: map.getCenter(),
        zoom: map.getZoom(),
      };
    }

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

      // If metric changed, restore the view after a short delay
      if (prevMetricRef.current !== activeMetric && viewStateRef.current) {
        const timeoutId = setTimeout(() => {
          if (map && viewStateRef.current && mapRef.current) {
            map.setView(
              viewStateRef.current.center,
              viewStateRef.current.zoom,
              { animate: false }
            );
          }
        }, 50);

        return () => clearTimeout(timeoutId);
      }
    }

    // Update previous metric ref
    prevMetricRef.current = activeMetric;

    return () => {
      if (heatLayerRef.current) {
        map.removeLayer(heatLayerRef.current);
      }
    };
  }, [map, locationScores, activeMetric, showHeatmap, mapRef]);

  return null;
};

const InvestmentMap = ({
  properties,
  locationScores,
  activeMetric,
  onPropertySelect,
  selectedProperty,
  showHeatmap = true,
  isMobile = false,
}) => {
  // Default center on Toronto-GTA area
  const defaultCenter = [43.6532, -79.3832];
  const defaultZoom = isMobile ? 13 : 14; // Slightly less zoom on mobile for better context

  // State to track current map view
  const [mapView, setMapView] = useState({
    center: defaultCenter,
    zoom: defaultZoom,
  });

  // Ref to store map instance
  const mapRef = useRef(null);

  // Ref to preserve view when changing metrics
  const preserveViewRef = useRef(null);

  // Format price as currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Create custom icon based on property status and size appropriately for mobile
  const createCustomIcon = (property) => {
    const isActive = property.status === 'Active';
    const isPending = property.status === 'Pending';
    const isSelected = selectedProperty && selectedProperty.id === property.id;

    let iconUrl;
    if (isSelected) {
      iconUrl =
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png';
    } else if (isActive) {
      iconUrl =
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png';
    } else if (isPending) {
      iconUrl =
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png';
    } else {
      iconUrl =
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png';
    }

    // Adjust icon size for mobile
    const iconSize = isMobile ? [20, 33] : [25, 41];
    const iconAnchor = isMobile ? [10, 33] : [12, 41];

    return new L.Icon({
      iconUrl,
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: iconSize,
      iconAnchor: iconAnchor,
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
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
    <MapContainer
      center={mapView.center}
      zoom={mapView.zoom}
      className="map"
      zoomControl={!isMobile} // Hide default zoom controls on mobile
      attributionControl={!isMobile} // Hide attribution on mobile to save space
      whenCreated={(map) => {
        mapRef.current = map;
        // Add zoom control to top right on mobile for better thumb access
        if (isMobile) {
          L.control.zoom({ position: 'topright' }).addTo(map);
        }
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <HeatmapLayer
        locationScores={locationScores}
        activeMetric={activeMetric}
        showHeatmap={showHeatmap}
        preserveViewRef={preserveViewRef}
        mapRef={mapRef}
      />

      <MapViewController
        onViewChange={setMapView}
        selectedProperty={selectedProperty}
        mapRef={mapRef}
        activeMetric={activeMetric}
        isMobile={isMobile}
      />

      {properties.map((property) => (
        <Marker
          key={property.id}
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
