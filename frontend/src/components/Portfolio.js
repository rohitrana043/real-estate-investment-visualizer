import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const Portfolio = () => {
  const [portfolioProperties, setPortfolioProperties] = useState([]);
  const [portfolioStats, setPortfolioStats] = useState({
    totalValue: 0,
    totalInvestment: 0,
    totalEquity: 0,
    monthlyCashFlow: 0,
    averageCapRate: 0,
    propertyCount: 0,
    cityBreakdown: [],
    typeBreakdown: [],
  });

  // Load portfolio from localStorage
  useEffect(() => {
    const savedPortfolio = localStorage.getItem('propertyPortfolio');
    if (savedPortfolio) {
      const portfolio = JSON.parse(savedPortfolio);
      setPortfolioProperties(portfolio);
      calculatePortfolioStats(portfolio);
    }
  }, []);

  // Calculate portfolio statistics
  const calculatePortfolioStats = (properties) => {
    if (!properties || properties.length === 0) {
      return;
    }

    const totalValue = properties.reduce(
      (sum, prop) => sum + prop.currentValue,
      0
    );
    const totalInvestment = properties.reduce(
      (sum, prop) => sum + prop.purchasePrice,
      0
    );
    const totalEquity = properties.reduce(
      (sum, prop) => sum + (prop.currentValue - prop.loanBalance),
      0
    );
    const monthlyCashFlow = properties.reduce(
      (sum, prop) => sum + prop.monthlyCashFlow,
      0
    );
    const capRates = properties
      .map((prop) => prop.capRate)
      .filter((rate) => !isNaN(rate));
    const averageCapRate =
      capRates.length > 0
        ? capRates.reduce((sum, rate) => sum + rate, 0) / capRates.length
        : 0;

    // City breakdown
    const cityCount = {};
    properties.forEach((prop) => {
      const city = prop.city || 'Other';
      cityCount[city] = (cityCount[city] || 0) + 1;
    });

    const cityBreakdown = Object.keys(cityCount).map((city) => ({
      name: city,
      value: cityCount[city],
    }));

    // Property type breakdown
    const typeCount = {};
    properties.forEach((prop) => {
      const type = `${prop.bedrooms} bed ${prop.propertyType || 'Property'}`;
      typeCount[type] = (typeCount[type] || 0) + 1;
    });

    const typeBreakdown = Object.keys(typeCount).map((type) => ({
      name: type,
      value: typeCount[type],
    }));

    setPortfolioStats({
      totalValue,
      totalInvestment,
      totalEquity,
      monthlyCashFlow,
      averageCapRate,
      propertyCount: properties.length,
      cityBreakdown,
      typeBreakdown,
    });
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Colors for the charts
  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#8884d8',
    '#82ca9d',
    '#ffc658',
  ];

  // Sample portfolio data for new users
  const addSamplePropertyToPortfolio = () => {
    const sampleProperties = [
      {
        id: 1,
        address: '35 Balmuto Street, Unit 1807',
        city: 'Toronto',
        state: 'ON',
        zipCode: 'M4Y 0A3',
        bedrooms: 1,
        bathrooms: 1,
        squareFeet: 550,
        purchasePrice: 699000,
        currentValue: 750000,
        loanBalance: 559200,
        monthlyRent: 2500,
        monthlyExpenses: 1800,
        monthlyCashFlow: 700,
        capRate: 2.85,
        propertyType: 'Condo',
        purchaseDate: '2023-05-15',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        id: 2,
        address: '12 York Street, Unit 5601',
        city: 'Toronto',
        state: 'ON',
        zipCode: 'M5J 0A9',
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 850,
        purchasePrice: 1250000,
        currentValue: 1320000,
        loanBalance: 1000000,
        monthlyRent: 3800,
        monthlyExpenses: 2900,
        monthlyCashFlow: 900,
        capRate: 2.45,
        propertyType: 'Condo',
        purchaseDate: '2022-11-30',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        id: 3,
        address: '33 Charles Street East, Unit 4302',
        city: 'Toronto',
        state: 'ON',
        zipCode: 'M4Y 0A2',
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 925,
        purchasePrice: 1099000,
        currentValue: 1150000,
        loanBalance: 879200,
        monthlyRent: 3600,
        monthlyExpenses: 2600,
        monthlyCashFlow: 1000,
        capRate: 2.63,
        propertyType: 'Condo',
        purchaseDate: '2023-02-21',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
    ];

    const updatedPortfolio = [...portfolioProperties, ...sampleProperties];
    setPortfolioProperties(updatedPortfolio);
    calculatePortfolioStats(updatedPortfolio);
    localStorage.setItem('propertyPortfolio', JSON.stringify(updatedPortfolio));
  };

  return (
    <div className="investment-dashboard">
      <h2 className="dashboard-title">Investment Portfolio</h2>

      {portfolioProperties.length === 0 ? (
        <div className="dashboard-section">
          <div className="empty-portfolio">
            <h3>Your portfolio is empty</h3>
            <p>You haven't added any properties to your portfolio yet.</p>
            <p>You can add properties manually or import them from listings.</p>
            <div className="portfolio-actions">
              <button
                className="btn btn-primary"
                onClick={addSamplePropertyToPortfolio}
              >
                Add Sample Properties
              </button>
              <button className="btn btn-secondary">
                Add Property Manually
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Portfolio Summary */}
          <div className="dashboard-section">
            <h3>Portfolio Summary</h3>
            <div className="portfolio-stats">
              <div className="stat-card">
                <div className="stat-title">Total Properties</div>
                <div className="stat-value">{portfolioStats.propertyCount}</div>
              </div>
              <div className="stat-card">
                <div className="stat-title">Total Value</div>
                <div className="stat-value">
                  {formatCurrency(portfolioStats.totalValue)}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-title">Total Equity</div>
                <div className="stat-value">
                  {formatCurrency(portfolioStats.totalEquity)}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-title">Monthly Cash Flow</div>
                <div className="stat-value">
                  {formatCurrency(portfolioStats.monthlyCashFlow)}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-title">Average Cap Rate</div>
                <div className="stat-value">
                  {portfolioStats.averageCapRate.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="dashboard-row">
            <div className="dashboard-card">
              <h3>City Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={portfolioStats.cityBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {portfolioStats.cityBreakdown.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} properties`, 'Count']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="dashboard-card">
              <h3>Property Type Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={portfolioStats.typeBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {portfolioStats.typeBreakdown.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} properties`, 'Count']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Properties Table */}
          <div className="dashboard-section">
            <div className="section-header">
              <h3>Your Properties</h3>
              <div className="portfolio-actions">
                <button className="btn btn-primary">
                  <i className="fas fa-plus"></i> Add Property
                </button>
                <button className="btn btn-secondary">
                  <i className="fas fa-file-export"></i> Export Data
                </button>
              </div>
            </div>
            <div className="portfolio-table-container">
              <table className="portfolio-table">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Purchase Price</th>
                    <th>Current Value</th>
                    <th>Equity</th>
                    <th>Monthly Cash Flow</th>
                    <th>Cap Rate</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolioProperties.map((property) => (
                    <tr key={property.id}>
                      <td>
                        <div className="property-cell">
                          <img
                            src={
                              property.imageUrl ||
                              'https://via.placeholder.com/50x50'
                            }
                            alt={property.address}
                            className="property-thumbnail"
                          />
                          <div className="property-info">
                            <div className="property-address">
                              {property.address}
                            </div>
                            <div className="property-details">
                              {property.bedrooms} bed, {property.bathrooms} bath
                              | {property.city}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{formatCurrency(property.purchasePrice)}</td>
                      <td>{formatCurrency(property.currentValue)}</td>
                      <td>
                        {formatCurrency(
                          property.currentValue - property.loanBalance
                        )}
                      </td>
                      <td>{formatCurrency(property.monthlyCashFlow)}</td>
                      <td>{property.capRate.toFixed(2)}%</td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-icon" title="Edit">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="btn-icon" title="Delete">
                            <i className="fas fa-trash"></i>
                          </button>
                          <button className="btn-icon" title="View Details">
                            <i className="fas fa-eye"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Portfolio;
