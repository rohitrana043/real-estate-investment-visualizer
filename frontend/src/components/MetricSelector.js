import React from 'react';

const MetricSelector = ({ activeMetric, onMetricChange }) => {
  return (
    <div className="metric-selector-panel">
      <div className="metric-selector-title">
        <i className="fas fa-layer-group"></i>
        <span>Metrics</span>
      </div>

      <div className="metric-selector-buttons">
        <button
          className={`metric-button ${
            activeMetric === 'overall' ? 'active' : ''
          }`}
          onClick={() => onMetricChange('overall')}
        >
          <i className="fas fa-star"></i>
          <span>Overall</span>
        </button>

        <button
          className={`metric-button ${
            activeMetric === 'performance' ? 'active' : ''
          }`}
          onClick={() => onMetricChange('performance')}
        >
          <i className="fas fa-chart-line"></i>
          <span>Performance</span>
        </button>

        <button
          className={`metric-button ${activeMetric === 'risk' ? 'active' : ''}`}
          onClick={() => onMetricChange('risk')}
        >
          <i className="fas fa-exclamation-triangle"></i>
          <span>Risk</span>
        </button>

        <button
          className={`metric-button ${
            activeMetric === 'demand' ? 'active' : ''
          }`}
          onClick={() => onMetricChange('demand')}
        >
          <i className="fas fa-users"></i>
          <span>Demand</span>
        </button>

        <button
          className={`metric-button ${
            activeMetric === 'supply' ? 'active' : ''
          }`}
          onClick={() => onMetricChange('supply')}
        >
          <i className="fas fa-home"></i>
          <span>Supply</span>
        </button>
      </div>
    </div>
  );
};

export default MetricSelector;
