import React from 'react';

const HeatmapLegend = ({ activeMetric }) => {
  const getMetricTitle = () => {
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
        return 'Cap rate, appreciation, cash on cash return';
      case 'risk':
        return 'Volatility, crime rate, price fluctuation';
      case 'demand':
        return 'Rental demand, days on market, population growth';
      case 'supply':
        return 'Inventory levels, new construction, vacancy rates';
      default:
        return 'Combined score of all metrics';
    }
  };

  return (
    <div className="heat-map-legend">
      <div className="legend-title">{getMetricTitle()}</div>
      <div className="legend-subtitle">{getMetricDescription()}</div>
      <div className="legend-gradient"></div>
      <div className="legend-labels">
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
      </div>
      <div className="legend-score-range">
        <span>0</span>
        <span>5</span>
        <span>10</span>
      </div>
    </div>
  );
};

export default HeatmapLegend;
