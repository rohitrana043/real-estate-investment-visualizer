import React from 'react';

const LocationScoreDisplay = ({ locationScore, activeMetric }) => {
  if (!locationScore) return null;

  // Get color for score bar
  const getScoreColor = (score) => {
    if (score >= 8) return '#4caf50'; // Green for high scores
    if (score >= 5) return '#ff9800'; // Orange for medium scores
    return '#f44336'; // Red for low scores
  };

  // Generate score bar component
  const ScoreBar = ({ label, value, max = 10 }) => {
    const percentage = (value / max) * 100;

    return (
      <div className="score-row">
        <div className="score-label">{label}</div>
        <div className="score-value">{value}</div>
        <div className="score-bar-container">
          <div className="score-bar">
            <div
              className="score-fill"
              style={{
                width: `${percentage}%`,
                backgroundColor: getScoreColor(value),
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  // Highlight the active metric
  const isActive = (metric) => {
    return activeMetric === metric;
  };

  return (
    <div className="location-scores">
      <ScoreBar label="Overall" value={locationScore.overallScore} max={10} />

      <ScoreBar
        label="Performance"
        value={locationScore.performanceScore}
        max={10}
      />

      <ScoreBar label="Risk" value={locationScore.riskScore} max={10} />

      <ScoreBar label="Demand" value={locationScore.demandScore} max={10} />

      <ScoreBar label="Supply" value={locationScore.supplyScore} max={10} />

      <div style={{ marginTop: '16px' }}>
        <h4>Performance Metrics</h4>
        <div className="metrics-list">
          <div className="metric-item">
            <span className="metric-label">Cap Rate:</span>
            <span className="metric-value">
              {locationScore.capRate.toFixed(2)}%
            </span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Appreciation:</span>
            <span className="metric-value">
              {locationScore.appreciation.toFixed(2)}%
            </span>
          </div>
          <div className="metric-item">
            <span className="metric-label">IRR:</span>
            <span className="metric-value">
              {locationScore.irr.toFixed(2)}%
            </span>
          </div>
          <div className="metric-item">
            <span className="metric-label">5-Year Total Return:</span>
            <span className="metric-value">
              {locationScore.fiveYearTotalReturn.toFixed(2)}%
            </span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Average House Price:</span>
            <span className="metric-value">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              }).format(locationScore.averageHousePrice)}
            </span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Property Tax:</span>
            <span className="metric-value">
              {locationScore.propertyTax.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <h4>Risk Metrics</h4>
        <div className="metrics-list">
          <div className="metric-item">
            <span className="metric-label">Neighborhood Change:</span>
            <span className="metric-value">
              {locationScore.neighborhoodChange.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationScoreDisplay;
