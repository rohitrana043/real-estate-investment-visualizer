import React, { useState, useEffect } from 'react';

const SimpleDashboard = ({ properties = [], locationScores = [] }) => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    averagePrice: 0,
    averageCapRate: 0,
    averageAppreciation: 0,
    cityBreakdown: {},
    bedroomBreakdown: {},
    priceRanges: {},
  });

  useEffect(() => {
    if (properties.length > 0 && locationScores.length > 0) {
      // Calculate stats
      const totalProperties = properties.length;
      const totalPrice = properties.reduce(
        (sum, prop) => sum + (prop.listPrice || 0),
        0
      );
      const averagePrice = totalPrice / totalProperties;

      // Calculate cap rates and appreciation stats
      let totalCapRate = 0;
      let totalAppreciation = 0;
      let capRateCount = 0;
      let appreciationCount = 0;

      locationScores.forEach((score) => {
        if (score.capRate) {
          totalCapRate += score.capRate;
          capRateCount++;
        }
        if (score.appreciation) {
          totalAppreciation += score.appreciation;
          appreciationCount++;
        }
      });

      const averageCapRate = capRateCount > 0 ? totalCapRate / capRateCount : 0;
      const averageAppreciation =
        appreciationCount > 0 ? totalAppreciation / appreciationCount : 0;

      // City breakdown
      const cityBreakdown = {};
      properties.forEach((prop) => {
        const city = prop.city || 'Unknown';
        cityBreakdown[city] = (cityBreakdown[city] || 0) + 1;
      });

      // Bedroom breakdown
      const bedroomBreakdown = {};
      properties.forEach((prop) => {
        const bedrooms = prop.bedrooms || 'Unknown';
        const key = `${bedrooms} bedroom${bedrooms !== 1 ? 's' : ''}`;
        bedroomBreakdown[key] = (bedroomBreakdown[key] || 0) + 1;
      });

      // Price ranges
      const priceRanges = {
        '<$500k': 0,
        '$500k-$750k': 0,
        '$750k-$1M': 0,
        '$1M-$1.5M': 0,
        '>$1.5M': 0,
      };

      properties.forEach((property) => {
        const price = property.listPrice;
        if (price < 500000) priceRanges['<$500k']++;
        else if (price < 750000) priceRanges['$500k-$750k']++;
        else if (price < 1000000) priceRanges['$750k-$1M']++;
        else if (price < 1500000) priceRanges['$1M-$1.5M']++;
        else priceRanges['>$1.5M']++;
      });

      setStats({
        totalProperties,
        averagePrice,
        averageCapRate,
        averageAppreciation,
        cityBreakdown,
        bedroomBreakdown,
        priceRanges,
      });
    }
  }, [properties, locationScores]);

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Sort city data
  const sortedCities = Object.entries(stats.cityBreakdown).sort(
    ([, countA], [, countB]) => countB - countA
  );

  // Sort bedroom data
  const sortedBedrooms = Object.entries(stats.bedroomBreakdown).sort(
    ([keyA], [keyB]) => {
      const numA = parseInt(keyA);
      const numB = parseInt(keyB);
      return numA - numB;
    }
  );

  return (
    <div className="simple-dashboard">
      <h2>Toronto GTA Investment Analysis Dashboard</h2>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Properties</h3>
          <p className="stat-value">{stats.totalProperties}</p>
        </div>
        <div className="stat-card">
          <h3>Average Price</h3>
          <p className="stat-value">{formatCurrency(stats.averagePrice)}</p>
        </div>
        <div className="stat-card">
          <h3>Average Cap Rate</h3>
          <p className="stat-value">{stats.averageCapRate.toFixed(2)}%</p>
        </div>
        <div className="stat-card">
          <h3>Average Appreciation</h3>
          <p className="stat-value">{stats.averageAppreciation.toFixed(2)}%</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="grid-item">
          <h3>Properties by City</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>City</th>
                <th>Count</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {sortedCities.map(([city, count]) => (
                <tr key={city}>
                  <td>{city}</td>
                  <td>{count}</td>
                  <td>{((count / stats.totalProperties) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid-item">
          <h3>Properties by Bedrooms</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Bedrooms</th>
                <th>Count</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {sortedBedrooms.map(([bedrooms, count]) => (
                <tr key={bedrooms}>
                  <td>{bedrooms}</td>
                  <td>{count}</td>
                  <td>{((count / stats.totalProperties) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid-item">
          <h3>Properties by Price Range</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Price Range</th>
                <th>Count</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(stats.priceRanges).map(([range, count]) => (
                <tr key={range}>
                  <td>{range}</td>
                  <td>{count}</td>
                  <td>{((count / stats.totalProperties) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="investment-insights">
        <h3>Toronto GTA Investment Insights</h3>
        <ul>
          <li>
            The average property price in the GTA is{' '}
            {formatCurrency(stats.averagePrice)}
          </li>
          <li>
            The average cap rate across GTA properties is{' '}
            {stats.averageCapRate.toFixed(2)}%
          </li>
          <li>
            The average appreciation rate is{' '}
            {stats.averageAppreciation.toFixed(2)}%
          </li>
          <li>
            The most common property type is {sortedBedrooms[0]?.[0] || 'N/A'}{' '}
            with {sortedBedrooms[0]?.[1] || 0} properties
          </li>
          <li>
            The city with the most properties is {sortedCities[0]?.[0] || 'N/A'}{' '}
            with {sortedCities[0]?.[1] || 0} properties
          </li>
          <li>
            Downtown Toronto offers the highest average appreciation at
            approximately 5.0%
          </li>
          <li>
            Brampton offers the highest average cap rate at approximately 3.7%
          </li>
        </ul>
      </div>
    </div>
  );
};

// Add some basic styles
const styles = `
  .simple-dashboard {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  h2 {
    color: #2e7d32;
    border-bottom: 2px solid #4caf50;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
  
  h3 {
    color: #333;
    margin-top: 0;
  }
  
  .dashboard-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
  }
  
  .stat-card {
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .stat-value {
    font-size: 24px;
    font-weight: bold;
    color: #2e7d32;
    margin: 8px 0 0;
  }
  
  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    margin-bottom: 24px;
  }
  
  .grid-item {
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .data-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 12px;
  }
  
  .data-table th, .data-table td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .data-table th {
    background-color: #e8f5e9;
    color: #2e7d32;
  }
  
  .investment-insights {
    background-color: #e8f5e9;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .investment-insights ul {
    margin: 0;
    padding-left: 20px;
  }
  
  .investment-insights li {
    margin-bottom: 8px;
    line-height: 1.5;
  }
  
  @media (max-width: 768px) {
    .dashboard-stats, .dashboard-grid {
      grid-template-columns: 1fr;
    }
  }
`;

// Create a style element and append styles
if (
  typeof document !== 'undefined' &&
  !document.getElementById('simple-dashboard-styles')
) {
  const styleElement = document.createElement('style');
  styleElement.id = 'simple-dashboard-styles';
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}

export default SimpleDashboard;
