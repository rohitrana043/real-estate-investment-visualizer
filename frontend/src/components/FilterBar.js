import React from 'react';

const FilterBar = ({ activeMetric, onMetricChange, onFilterClick }) => {
  return (
    <div className="filters-container">
      <div className="filters-row">
        <button
          className={`filter-button ${
            activeMetric === 'overall' ? 'active' : ''
          }`}
          onClick={() => onMetricChange('overall')}
        >
          <i className="filter-icon fas fa-star"></i>
          Overall
        </button>

        <button
          className={`filter-button ${
            activeMetric === 'performance' ? 'active' : ''
          }`}
          onClick={() => onMetricChange('performance')}
        >
          <i className="filter-icon fas fa-chart-line"></i>
          Performance
        </button>

        <button
          className={`filter-button ${activeMetric === 'risk' ? 'active' : ''}`}
          onClick={() => onMetricChange('risk')}
        >
          <i className="filter-icon fas fa-exclamation-triangle"></i>
          Risk
        </button>

        <button
          className={`filter-button ${
            activeMetric === 'demand' ? 'active' : ''
          }`}
          onClick={() => onMetricChange('demand')}
        >
          <i className="filter-icon fas fa-users"></i>
          Demand
        </button>

        <button
          className={`filter-button ${
            activeMetric === 'supply' ? 'active' : ''
          }`}
          onClick={() => onMetricChange('supply')}
        >
          <i className="filter-icon fas fa-home"></i>
          Supply
        </button>

        <button className="filter-button" onClick={onFilterClick}>
          <i className="filter-icon fas fa-filter"></i>
          Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
