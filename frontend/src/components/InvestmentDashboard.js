import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './InvestmentDashboard.css';

const InvestmentDashboard = ({
  properties,
  locationScores,
  view = 'compact',
}) => {
  const [dashboardData, setDashboardData] = useState({
    propertyTypeData: [],
    investmentMetricsData: [],
    locationScoreData: [],
    priceRangeData: [],
    cityComparisonData: [],
  });

  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedMetric, setSelectedMetric] = useState('capRate');

  // Process data for dashboard visualizations
  useEffect(() => {
    if (properties.length > 0 && locationScores.length > 0) {
      // Property type distribution
      const propertyTypes = {};
      properties.forEach((property) => {
        const bedKey = `${property.bedrooms} bedroom`;
        propertyTypes[bedKey] = (propertyTypes[bedKey] || 0) + 1;
      });

      const propertyTypeData = Object.keys(propertyTypes).map((key) => ({
        name: key,
        value: propertyTypes[key],
      }));

      // Investment metrics by neighborhood
      const locationMap = {};
      locationScores.forEach((score) => {
        locationMap[score.address] = {
          name: score.address,
          overallScore: score.overallScore,
          performanceScore: score.performanceScore,
          riskScore: score.riskScore,
          demandScore: score.demandScore,
          supplyScore: score.supplyScore,
          capRate: score.capRate,
          appreciation: score.appreciation,
        };
      });

      const investmentMetricsData = Object.values(locationMap);

      // Location score distribution
      const scoreRanges = {
        '0-2': 0,
        '3-4': 0,
        '5-6': 0,
        '7-8': 0,
        '9-10': 0,
      };

      locationScores.forEach((score) => {
        if (score.overallScore <= 2) scoreRanges['0-2']++;
        else if (score.overallScore <= 4) scoreRanges['3-4']++;
        else if (score.overallScore <= 6) scoreRanges['5-6']++;
        else if (score.overallScore <= 8) scoreRanges['7-8']++;
        else scoreRanges['9-10']++;
      });

      const locationScoreData = Object.keys(scoreRanges).map((key) => ({
        name: key,
        count: scoreRanges[key],
      }));

      // Price range distribution
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

      const priceRangeData = Object.keys(priceRanges).map((key) => ({
        name: key,
        count: priceRanges[key],
      }));

      // City comparison data
      const cityMetrics = {
        Toronto: {
          count: 0,
          totalCapRate: 0,
          totalAppreciation: 0,
          totalPrice: 0,
        },
        Mississauga: {
          count: 0,
          totalCapRate: 0,
          totalAppreciation: 0,
          totalPrice: 0,
        },
        Brampton: {
          count: 0,
          totalCapRate: 0,
          totalAppreciation: 0,
          totalPrice: 0,
        },
        Vaughan: {
          count: 0,
          totalCapRate: 0,
          totalAppreciation: 0,
          totalPrice: 0,
        },
        Markham: {
          count: 0,
          totalCapRate: 0,
          totalAppreciation: 0,
          totalPrice: 0,
        },
        Oakville: {
          count: 0,
          totalCapRate: 0,
          totalAppreciation: 0,
          totalPrice: 0,
        },
        'Other GTA': {
          count: 0,
          totalCapRate: 0,
          totalAppreciation: 0,
          totalPrice: 0,
        },
      };

      properties.forEach((property) => {
        const city = property.city;

        if (city === 'Toronto') {
          cityMetrics['Toronto'].count++;
          cityMetrics['Toronto'].totalPrice += property.listPrice;
        } else if (city === 'Mississauga') {
          cityMetrics['Mississauga'].count++;
          cityMetrics['Mississauga'].totalPrice += property.listPrice;
        } else if (city === 'Brampton') {
          cityMetrics['Brampton'].count++;
          cityMetrics['Brampton'].totalPrice += property.listPrice;
        } else if (city === 'Vaughan') {
          cityMetrics['Vaughan'].count++;
          cityMetrics['Vaughan'].totalPrice += property.listPrice;
        } else if (city === 'Markham') {
          cityMetrics['Markham'].count++;
          cityMetrics['Markham'].totalPrice += property.listPrice;
        } else if (city === 'Oakville') {
          cityMetrics['Oakville'].count++;
          cityMetrics['Oakville'].totalPrice += property.listPrice;
        } else {
          cityMetrics['Other GTA'].count++;
          cityMetrics['Other GTA'].totalPrice += property.listPrice;
        }
      });

      // Add cap rate and appreciation data from location scores
      locationScores.forEach((score) => {
        const address = score.address;

        if (
          address.includes('Toronto') ||
          address.includes('Downtown') ||
          address.includes('Midtown') ||
          address.includes('East Toronto') ||
          address.includes('West Toronto')
        ) {
          cityMetrics['Toronto'].totalCapRate += score.capRate;
          cityMetrics['Toronto'].totalAppreciation += score.appreciation;
        } else if (address.includes('Mississauga')) {
          cityMetrics['Mississauga'].totalCapRate += score.capRate;
          cityMetrics['Mississauga'].totalAppreciation += score.appreciation;
        } else if (address.includes('Brampton')) {
          cityMetrics['Brampton'].totalCapRate += score.capRate;
          cityMetrics['Brampton'].totalAppreciation += score.appreciation;
        } else if (address.includes('Vaughan')) {
          cityMetrics['Vaughan'].totalCapRate += score.capRate;
          cityMetrics['Vaughan'].totalAppreciation += score.appreciation;
        } else if (address.includes('Markham')) {
          cityMetrics['Markham'].totalCapRate += score.capRate;
          cityMetrics['Markham'].totalAppreciation += score.appreciation;
        } else if (address.includes('Oakville')) {
          cityMetrics['Oakville'].totalCapRate += score.capRate;
          cityMetrics['Oakville'].totalAppreciation += score.appreciation;
        } else {
          cityMetrics['Other GTA'].totalCapRate += score.capRate;
          cityMetrics['Other GTA'].totalAppreciation += score.appreciation;
        }
      });

      // Calculate averages and create comparison data
      const cityComparisonData = Object.keys(cityMetrics).map((city) => {
        const metrics = cityMetrics[city];
        const count = Math.max(metrics.count, 1); // Avoid division by zero

        return {
          name: city,
          capRate: metrics.totalCapRate / count,
          appreciation: metrics.totalAppreciation / count,
          avgPrice: metrics.totalPrice / count,
          propertyCount: metrics.count,
        };
      });

      setDashboardData({
        propertyTypeData,
        investmentMetricsData,
        locationScoreData,
        priceRangeData,
        cityComparisonData,
      });
    }
  }, [properties, locationScores]);

  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#8884d8',
    '#82ca9d',
    '#ffc658',
  ];

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Filter data by selected city
  const getFilteredData = () => {
    if (selectedCity === 'All') {
      return dashboardData.investmentMetricsData;
    }

    return dashboardData.investmentMetricsData.filter((item) =>
      item.name.includes(selectedCity)
    );
  };

  // Get city comparison data sorted by the selected metric
  const getSortedCityData = () => {
    return [...dashboardData.cityComparisonData].sort(
      (a, b) => b[selectedMetric] - a[selectedMetric]
    );
  };

  return (
    <div className="investment-dashboard">
      <h2 className="dashboard-title">
        Toronto GTA Investment Analysis Dashboard
      </h2>

      {/* City Metrics Comparison */}
      <div className="dashboard-section">
        <div className="section-header">
          <h3>GTA City Comparison</h3>
          <div className="metric-selector">
            <label>Metric: </label>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
            >
              <option value="capRate">Cap Rate</option>
              <option value="appreciation">Appreciation</option>
              <option value="avgPrice">Avg. Price</option>
              <option value="propertyCount">Property Count</option>
            </select>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={getSortedCityData()}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value, name) => {
                if (name === 'capRate' || name === 'appreciation') {
                  return [
                    `${value.toFixed(2)}%`,
                    name === 'capRate' ? 'Cap Rate' : 'Appreciation',
                  ];
                } else if (name === 'avgPrice') {
                  return [formatCurrency(value), 'Avg. Price'];
                }
                return [value, 'Property Count'];
              }}
            />
            <Legend />
            <Bar
              dataKey={selectedMetric}
              name={
                selectedMetric === 'capRate'
                  ? 'Cap Rate'
                  : selectedMetric === 'appreciation'
                  ? 'Appreciation'
                  : selectedMetric === 'avgPrice'
                  ? 'Avg. Price'
                  : 'Property Count'
              }
              fill="#4caf50"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="dashboard-row">
        <div className="dashboard-card">
          <h3>Cap Rate vs. Appreciation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={dashboardData.cityComparisonData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="capRate" name="Cap Rate (%)" fill="#8884d8" />
              <Bar
                dataKey="appreciation"
                name="Appreciation (%)"
                fill="#82ca9d"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard-card">
          <h3>Price Range Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={dashboardData.priceRangeData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [value, 'Properties']} />
              <Legend />
              <Bar dataKey="count" name="Number of Properties" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {view === 'detailed' && (
        <div className="dashboard-row">
          <div className="dashboard-card full-width">
            <div className="section-header">
              <h3>Investment Metrics by Neighborhood</h3>
              <div className="city-selector">
                <label>Filter by: </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="All">All Areas</option>
                  <option value="Toronto">Toronto</option>
                  <option value="Downtown">Downtown Toronto</option>
                  <option value="Midtown">Midtown Toronto</option>
                  <option value="East">East Toronto</option>
                  <option value="West">West Toronto</option>
                  <option value="Mississauga">Mississauga</option>
                  <option value="Brampton">Brampton</option>
                  <option value="Vaughan">Vaughan</option>
                  <option value="Markham">Markham</option>
                  <option value="Oakville">Oakville</option>
                </select>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={getFilteredData()}
                margin={{ top: 5, right: 30, left: 20, bottom: 100 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="performanceScore"
                  name="Performance"
                  fill="#8884d8"
                />
                <Bar dataKey="riskScore" name="Risk" fill="#82ca9d" />
                <Bar dataKey="demandScore" name="Demand" fill="#ffc658" />
                <Bar dataKey="supplyScore" name="Supply" fill="#ff8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="dashboard-row">
        <div className="dashboard-card">
          <h3>Location Score Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={dashboardData.locationScoreData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Number of Locations" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard-card">
          <h3>Cap Rate vs. Appreciation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis
                type="number"
                dataKey="capRate"
                name="Cap Rate (%)"
                domain={[2, 4.5]}
                label={{ value: 'Cap Rate (%)', position: 'bottom' }}
              />
              <YAxis
                type="number"
                dataKey="appreciation"
                name="Appreciation (%)"
                domain={[3, 6]}
                label={{
                  value: 'Appreciation (%)',
                  angle: -90,
                  position: 'left',
                }}
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                formatter={(value, name) => [
                  `${value.toFixed(2)}%`,
                  name === 'capRate' ? 'Cap Rate' : 'Appreciation',
                ]}
                labelFormatter={(value) =>
                  dashboardData.cityComparisonData[value]
                    ? dashboardData.cityComparisonData[value].name
                    : ''
                }
              />
              <Legend />
              <Scatter
                name="Cities"
                data={dashboardData.cityComparisonData}
                fill="#4caf50"
                shape="circle"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="dashboard-summary">
        <h3>Toronto GTA Investment Insights</h3>
        <ul>
          <li>
            The average cap rate across GTA properties is{' '}
            {(
              dashboardData.cityComparisonData.reduce(
                (sum, item) => sum + (item.capRate || 0),
                0
              ) / (dashboardData.cityComparisonData.length || 1)
            ).toFixed(2)}
            %
          </li>
          <li>
            The average appreciation rate is{' '}
            {(
              dashboardData.cityComparisonData.reduce(
                (sum, item) => sum + (item.appreciation || 0),
                0
              ) / (dashboardData.cityComparisonData.length || 1)
            ).toFixed(2)}
            %
          </li>
          <li>
            The highest cap rates can be found in{' '}
            {[...dashboardData.cityComparisonData].sort(
              (a, b) => b.capRate - a.capRate
            )[0]?.name || 'N/A'}
          </li>
          <li>
            The highest appreciation rates are in{' '}
            {[...dashboardData.cityComparisonData].sort(
              (a, b) => b.appreciation - a.appreciation
            )[0]?.name || 'N/A'}
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

export default InvestmentDashboard;
