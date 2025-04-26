import React from 'react';

const TorontoMetrics = ({ locationScores }) => {
  // Group location scores by region
  const getRegionData = () => {
    const regions = {
      'Downtown Toronto': [],
      'Toronto Midtown': [],
      'Toronto East': [],
      'Toronto West': [],
      Mississauga: [],
      Brampton: [],
      Vaughan: [],
      Markham: [],
      'Richmond Hill': [],
      Oakville: [],
      'Other GTA': [],
    };

    locationScores.forEach((score) => {
      if (
        score.address.includes('Downtown') ||
        score.address.includes('Financial') ||
        score.address.includes('Entertainment') ||
        score.address.includes('King') ||
        score.address.includes('Queen') ||
        score.address.includes('Bay')
      ) {
        regions['Downtown Toronto'].push(score);
      } else if (
        score.address.includes('Midtown') ||
        score.address.includes('Yonge') ||
        score.address.includes('Eglinton') ||
        score.address.includes('St Clair')
      ) {
        regions['Toronto Midtown'].push(score);
      } else if (
        score.address.includes('East') ||
        score.address.includes('Beaches') ||
        score.address.includes('Leslieville') ||
        score.address.includes('Danforth')
      ) {
        regions['Toronto East'].push(score);
      } else if (
        score.address.includes('West') ||
        score.address.includes('High Park') ||
        score.address.includes('Junction') ||
        score.address.includes('Liberty')
      ) {
        regions['Toronto West'].push(score);
      } else if (score.address.includes('Mississauga')) {
        regions['Mississauga'].push(score);
      } else if (score.address.includes('Brampton')) {
        regions['Brampton'].push(score);
      } else if (score.address.includes('Vaughan')) {
        regions['Vaughan'].push(score);
      } else if (score.address.includes('Markham')) {
        regions['Markham'].push(score);
      } else if (score.address.includes('Richmond Hill')) {
        regions['Richmond Hill'].push(score);
      } else if (score.address.includes('Oakville')) {
        regions['Oakville'].push(score);
      } else {
        regions['Other GTA'].push(score);
      }
    });

    return regions;
  };

  // Calculate average metrics by region
  const calculateRegionAverages = () => {
    const regions = getRegionData();
    const averages = {};

    Object.keys(regions).forEach((region) => {
      if (regions[region].length > 0) {
        const scores = regions[region];

        averages[region] = {
          count: scores.length,
          overallScore:
            scores.reduce((sum, score) => sum + score.overallScore, 0) /
            scores.length,
          performanceScore:
            scores.reduce((sum, score) => sum + score.performanceScore, 0) /
            scores.length,
          riskScore:
            scores.reduce((sum, score) => sum + score.riskScore, 0) /
            scores.length,
          demandScore:
            scores.reduce((sum, score) => sum + score.demandScore, 0) /
            scores.length,
          supplyScore:
            scores.reduce((sum, score) => sum + score.supplyScore, 0) /
            scores.length,
          capRate:
            scores.reduce((sum, score) => sum + score.capRate, 0) /
            scores.length,
          appreciation:
            scores.reduce((sum, score) => sum + score.appreciation, 0) /
            scores.length,
          avgPrice:
            scores.reduce((sum, score) => sum + score.averageHousePrice, 0) /
            scores.length,
        };
      }
    });

    return averages;
  };

  const regionAverages = calculateRegionAverages();

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="toronto-metrics">
      <h3>Greater Toronto Area Investment Metrics</h3>

      <div className="metrics-table-container">
        <table className="metrics-table">
          <thead>
            <tr>
              <th>Region</th>
              <th>Overall Score</th>
              <th>Cap Rate</th>
              <th>Appreciation</th>
              <th>Avg. Price</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(regionAverages).map((region) => (
              <tr key={region}>
                <td>{region}</td>
                <td>{regionAverages[region].overallScore.toFixed(1)}</td>
                <td>{regionAverages[region].capRate.toFixed(2)}%</td>
                <td>{regionAverages[region].appreciation.toFixed(2)}%</td>
                <td>{formatCurrency(regionAverages[region].avgPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="metrics-insights">
        <h4>GTA Investment Insights</h4>
        <ul>
          <li>
            <strong>Best for Appreciation:</strong> Downtown Toronto offers the
            highest appreciation potential but at higher entry prices.
          </li>
          <li>
            <strong>Best for Cash Flow:</strong> Brampton and other suburban
            areas provide better cap rates and rental yields.
          </li>
          <li>
            <strong>Balanced Investment:</strong> Midtown Toronto and
            Mississauga offer good balance between appreciation and cash flow.
          </li>
          <li>
            <strong>Emerging Markets:</strong> Areas like Vaughan and Markham
            are seeing strong growth due to development and transit expansion.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TorontoMetrics;
