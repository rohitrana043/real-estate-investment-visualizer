import React from 'react';

const FilterBar = ({ onFilterClick }) => {
  return (
    <div className="filters-container">
      <div className="filters-row">
        <button className="filter-button" onClick={onFilterClick}>
          <i className="filter-icon fas fa-filter"></i>
          Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
