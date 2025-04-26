import React, { useState } from 'react';

const FilterDialog = ({ filters, onFilterChange, onClose }) => {
  const [localFilters, setLocalFilters] = useState({ ...filters });

  const handleFilterChange = (key, value) => {
    setLocalFilters({ ...localFilters, [key]: value });
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
    onClose();
  };

  const handleResetFilters = () => {
    setLocalFilters({
      bedrooms: 0,
      bathrooms: 0,
      sqftMin: 0,
      sqftMax: 10000,
      yearBuiltMin: 1900,
      yearBuiltMax: new Date().getFullYear(),
      showActive: true,
      showPending: true,
      city: 'Toronto',
    });
  };

  // Generate the options for bedrooms and bathrooms
  const bedroomOptions = [0, 1, 2, 3, 4, 5, 6];
  const bathroomOptions = [0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  return (
    <div className="filter-dialog">
      <div className="filter-dialog-header">
        <h3 className="filter-dialog-title">Filters</h3>
        <button className="filter-dialog-close" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="filter-dialog-content">
        <div className="filter-category">
          <div className="filter-category-title">Location Scores</div>
          <div className="filter-options">
            <button
              className={`filter-option ${
                localFilters.showLocationScores ? 'selected' : ''
              }`}
              onClick={() =>
                handleFilterChange(
                  'showLocationScores',
                  !localFilters.showLocationScores
                )
              }
            >
              Show Location Scores
            </button>
          </div>
        </div>

        <div className="filter-category">
          <div className="filter-category-title">City</div>
          <div className="filter-options">
            <button
              className={`filter-option ${
                localFilters.city === 'Toronto' ? 'selected' : ''
              }`}
              onClick={() => handleFilterChange('city', 'Toronto')}
            >
              Toronto
            </button>
            <button
              className={`filter-option ${
                localFilters.city === 'Mississauga' ? 'selected' : ''
              }`}
              onClick={() => handleFilterChange('city', 'Mississauga')}
            >
              Mississauga
            </button>
            <button
              className={`filter-option ${
                localFilters.city === 'Brampton' ? 'selected' : ''
              }`}
              onClick={() => handleFilterChange('city', 'Brampton')}
            >
              Brampton
            </button>
            <button
              className={`filter-option ${
                localFilters.city === 'Vaughan' ? 'selected' : ''
              }`}
              onClick={() => handleFilterChange('city', 'Vaughan')}
            >
              Vaughan
            </button>
            <button
              className={`filter-option ${
                localFilters.city === 'Markham' ? 'selected' : ''
              }`}
              onClick={() => handleFilterChange('city', 'Markham')}
            >
              Markham
            </button>
            <button
              className={`filter-option ${
                localFilters.city === 'Oakville' ? 'selected' : ''
              }`}
              onClick={() => handleFilterChange('city', 'Oakville')}
            >
              Oakville
            </button>
            <button
              className={`filter-option ${
                localFilters.city === 'All' ? 'selected' : ''
              }`}
              onClick={() => handleFilterChange('city', 'All')}
            >
              All GTA
            </button>
          </div>
        </div>

        <div className="filter-category">
          <div className="filter-category-title">Listing Types</div>
          <div className="filter-options">
            <button
              className={`filter-option ${
                localFilters.showActive ? 'selected' : ''
              }`}
              onClick={() =>
                handleFilterChange('showActive', !localFilters.showActive)
              }
            >
              Live Listings
            </button>
            <button
              className={`filter-option ${
                localFilters.showPending ? 'selected' : ''
              }`}
              onClick={() =>
                handleFilterChange('showPending', !localFilters.showPending)
              }
            >
              New Homes
            </button>
          </div>
        </div>

        <div className="filter-category">
          <div className="filter-category-title">Bedrooms</div>
          <div className="filter-options">
            {bedroomOptions.map((option) => (
              <button
                key={option}
                className={`filter-option ${
                  localFilters.bedrooms === option ? 'selected' : ''
                }`}
                onClick={() => handleFilterChange('bedrooms', option)}
              >
                {option === 0 ? 'Any' : `${option}+`}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-category">
          <div className="filter-category-title">Bathrooms</div>
          <div className="filter-options">
            {bathroomOptions.map((option) => (
              <button
                key={option}
                className={`filter-option ${
                  localFilters.bathrooms === option ? 'selected' : ''
                }`}
                onClick={() => handleFilterChange('bathrooms', option)}
              >
                {option === 0 ? 'Any' : `${option}+`}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-category">
          <div className="range-filter">
            <div className="range-filter-header">
              <div className="range-filter-label">Total Square Footage</div>
              <div className="range-filter-value">
                {localFilters.sqftMin} -{' '}
                {localFilters.sqftMax === 10000
                  ? 'Unlimited'
                  : localFilters.sqftMax}
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={10000}
              step={100}
              value={localFilters.sqftMax}
              onChange={(e) =>
                handleFilterChange('sqftMax', parseInt(e.target.value))
              }
              className="range-slider"
            />
          </div>
        </div>

        <div className="filter-category">
          <div className="range-filter">
            <div className="range-filter-header">
              <div className="range-filter-label">Year Built</div>
              <div className="range-filter-value">
                {localFilters.yearBuiltMin} -{' '}
                {localFilters.yearBuiltMax === new Date().getFullYear()
                  ? 'Any'
                  : localFilters.yearBuiltMax}
              </div>
            </div>
            <input
              type="range"
              min={1900}
              max={new Date().getFullYear()}
              step={5}
              value={localFilters.yearBuiltMin}
              onChange={(e) =>
                handleFilterChange('yearBuiltMin', parseInt(e.target.value))
              }
              className="range-slider"
            />
          </div>
        </div>
      </div>

      <div className="filter-dialog-footer">
        <button className="btn btn-secondary" onClick={handleResetFilters}>
          Reset All Filters
        </button>
        <button className="btn btn-primary" onClick={handleApplyFilters}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterDialog;
