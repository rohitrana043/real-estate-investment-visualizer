import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const Reports = () => {
  const [portfolioProperties, setPortfolioProperties] = useState([]);
  const [portfolioHistory, setPortfolioHistory] = useState([]);
  const [reportType, setReportType] = useState('performance');
  const [timeRange, setTimeRange] = useState('1year');
  const [reportData, setReportData] = useState({
    performance: [],
    cashFlow: [],
    equity: [],
    roi: [],
  });

  // Load portfolio from localStorage
  useEffect(() => {
    const savedPortfolio = localStorage.getItem('propertyPortfolio');
    if (savedPortfolio) {
      const portfolio = JSON.parse(savedPortfolio);
      setPortfolioProperties(portfolio);
    }

    // Load or generate portfolio history data
    const savedHistory = localStorage.getItem('portfolioHistory');
    if (savedHistory) {
      setPortfolioHistory(JSON.parse(savedHistory));
    } else {
      generateSampleHistory();
    }
  }, []);

  // Generate sample historical data for demonstration
  const generateSampleHistory = () => {
    // Generate monthly data for the last 2 years
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 2);

    const historyData = [];
    let totalValue = 3000000; // Starting portfolio value
    let totalEquity = 900000; // Starting equity
    let monthlyCashFlow = 2600; // Starting monthly cash flow

    // Generate monthly data points
    for (let i = 0; i < 24; i++) {
      const date = new Date(startDate);
      date.setMonth(date.getMonth() + i);

      // Fluctuate values with some randomness and overall growth trend
      const valueGrowthRate = 1 + (0.003 + Math.random() * 0.006); // 0.3% to 0.9% monthly growth
      const equityGrowthRate = 1 + (0.005 + Math.random() * 0.008); // 0.5% to 1.3% monthly equity growth
      const cashFlowGrowthRate = 1 + (0.001 + Math.random() * 0.005); // 0.1% to 0.6% monthly cash flow growth

      totalValue = totalValue * valueGrowthRate;
      totalEquity = totalEquity * equityGrowthRate;
      monthlyCashFlow = monthlyCashFlow * cashFlowGrowthRate;

      historyData.push({
        date: date.toISOString().slice(0, 7), // YYYY-MM format
        totalValue: Math.round(totalValue),
        totalEquity: Math.round(totalEquity),
        monthlyCashFlow: Math.round(monthlyCashFlow),
        roi: ((monthlyCashFlow * 12) / totalEquity) * 100, // Annual ROI as percentage
        capRate: ((monthlyCashFlow * 12) / totalValue) * 100, // Cap rate as percentage
      });
    }

    setPortfolioHistory(historyData);
    localStorage.setItem('portfolioHistory', JSON.stringify(historyData));
  };

  // Process data based on selected time range and report type
  useEffect(() => {
    if (portfolioHistory.length === 0) return;

    // Filter data based on selected time range
    const now = new Date();
    let filteredData = [...portfolioHistory];

    if (timeRange === '1month') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(now.getMonth() - 1);
      filteredData = portfolioHistory.filter(
        (item) => new Date(item.date) >= oneMonthAgo
      );
    } else if (timeRange === '3months') {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(now.getMonth() - 3);
      filteredData = portfolioHistory.filter(
        (item) => new Date(item.date) >= threeMonthsAgo
      );
    } else if (timeRange === '6months') {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(now.getMonth() - 6);
      filteredData = portfolioHistory.filter(
        (item) => new Date(item.date) >= sixMonthsAgo
      );
    } else if (timeRange === '1year') {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(now.getFullYear() - 1);
      filteredData = portfolioHistory.filter(
        (item) => new Date(item.date) >= oneYearAgo
      );
    }

    // Prepare specific data sets
    const performance = filteredData.map((item) => ({
      name: item.date,
      'Total Value': item.totalValue,
      'Total Equity': item.totalEquity,
    }));

    const cashFlow = filteredData.map((item) => ({
      name: item.date,
      'Monthly Cash Flow': item.monthlyCashFlow,
    }));

    const equity = filteredData.map((item) => ({
      name: item.date,
      Equity: item.totalEquity,
      'Equity %': (item.totalEquity / item.totalValue) * 100,
    }));

    const roi = filteredData.map((item) => ({
      name: item.date,
      ROI: item.roi,
      'Cap Rate': item.capRate,
    }));

    setReportData({
      performance,
      cashFlow,
      equity,
      roi,
    });
  }, [portfolioHistory, timeRange]);

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Calculate performance metrics
  const calculateMetrics = () => {
    if (portfolioHistory.length < 2) return {};

    const latestData = portfolioHistory[portfolioHistory.length - 1];
    const earliestData = portfolioHistory[0];

    const valueGrowth =
      ((latestData.totalValue - earliestData.totalValue) /
        earliestData.totalValue) *
      100;
    const equityGrowth =
      ((latestData.totalEquity - earliestData.totalEquity) /
        earliestData.totalEquity) *
      100;
    const cashFlowGrowth =
      ((latestData.monthlyCashFlow - earliestData.monthlyCashFlow) /
        earliestData.monthlyCashFlow) *
      100;

    return {
      valueGrowth,
      equityGrowth,
      cashFlowGrowth,
      currentValue: latestData.totalValue,
      currentEquity: latestData.totalEquity,
      currentCashFlow: latestData.monthlyCashFlow,
    };
  };

  const metrics = calculateMetrics();

  // Render appropriate chart based on report type
  const renderChart = () => {
    switch (reportType) {
      case 'performance':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={reportData.performance}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value) => [
                  formatCurrency(value),
                  value === 'Total Value' ? 'Property Value' : 'Equity',
                ]}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="Total Value"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="Total Equity"
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'cashFlow':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={reportData.cashFlow}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value) => [
                  formatCurrency(value),
                  'Monthly Cash Flow',
                ]}
              />
              <Legend />
              <Bar dataKey="Monthly Cash Flow" fill="#4caf50" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'equity':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={reportData.equity}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value, name) => {
                  return name === 'Equity'
                    ? [formatCurrency(value), 'Equity']
                    : [`${value.toFixed(2)}%`, 'Equity Percentage'];
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="Equity"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="Equity %"
                stroke="#ff7300"
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'roi':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={reportData.roi}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value.toFixed(2)}%`, '']} />
              <Legend />
              <Line
                type="monotone"
                dataKey="ROI"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="Cap Rate" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  const exportReportAsCSV = () => {
    // Get current data based on selected report type
    let data = [];
    let filename = `investment_${reportType}_report_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    switch (reportType) {
      case 'performance':
        data = reportData.performance;
        break;
      case 'cashFlow':
        data = reportData.cashFlow;
        break;
      case 'equity':
        data = reportData.equity;
        break;
      case 'roi':
        data = reportData.roi;
        break;
      default:
        data = reportData.performance;
    }

    if (data.length === 0) {
      alert('No data available to export');
      return;
    }

    // Create CSV content
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map((row) => Object.values(row).join(',')).join('\n');
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;

    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);

    // Trigger download
    link.click();
    document.body.removeChild(link);
  };

  const printReport = () => {
    // Simple print functionality
    window.print();
  };

  const shareReport = () => {
    // Check if Web Share API is available
    if (navigator.share) {
      navigator
        .share({
          title: `Investment ${
            reportType.charAt(0).toUpperCase() + reportType.slice(1)
          } Report`,
          text: `Here's my investment performance report for ${timeRange}`,
          url: window.location.href,
        })
        .then(() => console.log('Report shared successfully'))
        .catch((error) => console.log('Error sharing report:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      const shareText = `Copy this link to share your report: ${window.location.href}`;
      alert(shareText);
    }
  };

  const saveReport = () => {
    // Save current report configuration to localStorage
    const reportConfig = {
      reportType,
      timeRange,
      savedAt: new Date().toISOString(),
    };

    // Get existing saved reports or initialize empty array
    const savedReports = JSON.parse(
      localStorage.getItem('savedReports') || '[]'
    );

    // Add new report and save back to localStorage
    savedReports.push(reportConfig);
    localStorage.setItem('savedReports', JSON.stringify(savedReports));

    alert('Report configuration saved successfully!');
  };

  return (
    <div className="investment-dashboard">
      <h2 className="dashboard-title">Investment Reports</h2>

      {/* Summary Section */}
      <div className="dashboard-section">
        <h3>Portfolio Performance Summary</h3>
        <div className="portfolio-stats">
          <div className="stat-card">
            <div className="stat-title">Current Value</div>
            <div className="stat-value">
              {formatCurrency(metrics.currentValue || 0)}
            </div>
            <div className="stat-growth">
              <span
                className={metrics.valueGrowth >= 0 ? 'positive' : 'negative'}
              >
                {metrics.valueGrowth
                  ? metrics.valueGrowth.toFixed(2) + '%'
                  : '0%'}
              </span>
              <span className="timeframe">2-year growth</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Current Equity</div>
            <div className="stat-value">
              {formatCurrency(metrics.currentEquity || 0)}
            </div>
            <div className="stat-growth">
              <span
                className={metrics.equityGrowth >= 0 ? 'positive' : 'negative'}
              >
                {metrics.equityGrowth
                  ? metrics.equityGrowth.toFixed(2) + '%'
                  : '0%'}
              </span>
              <span className="timeframe">2-year growth</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Monthly Cash Flow</div>
            <div className="stat-value">
              {formatCurrency(metrics.currentCashFlow || 0)}
            </div>
            <div className="stat-growth">
              <span
                className={
                  metrics.cashFlowGrowth >= 0 ? 'positive' : 'negative'
                }
              >
                {metrics.cashFlowGrowth
                  ? metrics.cashFlowGrowth.toFixed(2) + '%'
                  : '0%'}
              </span>
              <span className="timeframe">2-year growth</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Annual ROI</div>
            <div className="stat-value">
              {portfolioHistory.length > 0
                ? `${portfolioHistory[portfolioHistory.length - 1].roi.toFixed(
                    2
                  )}%`
                : '0%'}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Properties</div>
            <div className="stat-value">{portfolioProperties.length}</div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="dashboard-section">
        <div className="section-header">
          <h3>
            {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report
          </h3>
          <div className="report-controls">
            <div className="report-type-selector">
              <label>Report Type:</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="performance">Property Value</option>
                <option value="cashFlow">Cash Flow</option>
                <option value="equity">Equity Growth</option>
                <option value="roi">ROI & Cap Rate</option>
              </select>
            </div>
            <div className="time-range-selector">
              <label>Time Range:</label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="1month">1 Month</option>
                <option value="3months">3 Months</option>
                <option value="6months">6 Months</option>
                <option value="1year">1 Year</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>
        </div>

        <div className="chart-container">
          {portfolioHistory.length > 0 ? (
            renderChart()
          ) : (
            <div className="no-data-message">
              <p>No historical data available to generate reports.</p>
              <button
                className="btn btn-primary"
                onClick={generateSampleHistory}
              >
                Generate Sample Data
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Report Actions */}
      <div className="dashboard-section">
        <div className="section-header">
          <h3>Report Actions</h3>
        </div>
        <div className="report-actions">
          <button className="btn btn-primary" onClick={exportReportAsCSV}>
            <i className="fas fa-file-export"></i> Export Report
          </button>
          <button className="btn btn-secondary" onClick={printReport}>
            <i className="fas fa-print"></i> Print Report
          </button>
          <button className="btn btn-secondary" onClick={shareReport}>
            <i className="fas fa-share-alt"></i> Share Report
          </button>
          <button className="btn btn-secondary" onClick={saveReport}>
            <i className="fas fa-save"></i> Save Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
