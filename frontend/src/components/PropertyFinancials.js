import React, { useState } from 'react';

const PropertyFinancials = ({ property }) => {
  const [offerPrice, setOfferPrice] = useState(property.listPrice);
  const [rehabCosts, setRehabCosts] = useState(25000);

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Calculate financials
  const calculateMonthlyCosts = () => {
    // Assuming 80% LTV loan, 30-year mortgage, 7% interest rate
    const downPayment = offerPrice * 0.2;
    const loanAmount = offerPrice * 0.8;
    const monthlyInterestRate = 0.07 / 12;
    const months = 30 * 12;

    // Calculate monthly mortgage payment (P&I)
    const mortgage =
      (loanAmount *
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months))) /
      (Math.pow(1 + monthlyInterestRate, months) - 1);

    // Property tax (annually divided by 12)
    const propertyTax = (offerPrice * (property.propertyTax / 100)) / 12;

    // Insurance (estimate: $1000 annually / 12)
    const insurance = 1000 / 12;

    // Maintenance (1% of property value annually / 12)
    const maintenance = (offerPrice * 0.01) / 12;

    // HOA (if applicable)
    const hoa = 0; // Assuming no HOA fees for now

    // Total monthly payment
    return {
      mortgage: mortgage,
      propertyTax: propertyTax,
      insurance: insurance,
      maintenance: maintenance,
      hoa: hoa,
      total: mortgage + propertyTax + insurance + maintenance + hoa,
    };
  };

  const calculateFinancials = () => {
    const monthlyCosts = calculateMonthlyCosts();
    const totalMonthlyCost = monthlyCosts.total;
    const monthlyRent = property.monthlyRent;
    const cashFlow = monthlyRent - totalMonthlyCost;
    const annualCashFlow = cashFlow * 12;

    // Calculate cash on cash return
    const initialInvestment = offerPrice * 0.2 + rehabCosts + 5000; // Down payment + rehab + closing costs
    const cashOnCash = (annualCashFlow / initialInvestment) * 100;

    // Calculate cap rate
    const annualGrossIncome = monthlyRent * 12;
    const annualExpenses = totalMonthlyCost * 12;
    const netOperatingIncome = annualGrossIncome - annualExpenses;
    const capRate = (netOperatingIncome / offerPrice) * 100;

    return {
      monthlyRent: monthlyRent,
      monthlyCosts: totalMonthlyCost,
      cashFlow: cashFlow,
      annualCashFlow: annualCashFlow,
      initialInvestment: initialInvestment,
      cashOnCash: cashOnCash,
      capRate: capRate,
      netOperatingIncome: netOperatingIncome,
    };
  };

  const financials = calculateFinancials();

  return (
    <div className="property-financials">
      <div className="financial-inputs">
        <div className="financial-input">
          <label>List Price</label>
          <input
            type="text"
            value={formatCurrency(property.listPrice)}
            disabled
            className="currency-input"
          />
        </div>

        <div className="financial-input">
          <label>Offer Price</label>
          <input
            type="range"
            min={property.listPrice * 0.8}
            max={property.listPrice * 1.1}
            step={1000}
            value={offerPrice}
            onChange={(e) => setOfferPrice(Number(e.target.value))}
            className="range-slider"
          />
          <span>{formatCurrency(offerPrice)}</span>
        </div>

        <div className="financial-input">
          <label>Rehab Costs</label>
          <input
            type="range"
            min={0}
            max={100000}
            step={1000}
            value={rehabCosts}
            onChange={(e) => setRehabCosts(Number(e.target.value))}
            className="range-slider"
          />
          <span>{formatCurrency(rehabCosts)}</span>
        </div>
      </div>

      <div className="financial-results" style={{ marginTop: '16px' }}>
        <div className="financial-metric">
          <div className="metric-label">Estimated Monthly Rent</div>
          <div className="metric-value">
            {formatCurrency(financials.monthlyRent)}
          </div>
        </div>

        <div className="financial-metric">
          <div className="metric-label">Estimated Monthly Costs</div>
          <div className="metric-value">
            {formatCurrency(financials.monthlyCosts)}
          </div>
          <button className="details-button">View expense details</button>
        </div>

        <div className="financial-metric">
          <div className="metric-label">Monthly Cash Flow</div>
          <div
            className="metric-value"
            style={{
              color: financials.cashFlow >= 0 ? '#4caf50' : '#f44336',
            }}
          >
            {formatCurrency(financials.cashFlow)}
          </div>
        </div>

        <div className="financial-metric">
          <div className="metric-label">Net Operating Income</div>
          <div className="metric-value">
            {formatCurrency(financials.netOperatingIncome)}
          </div>
        </div>

        <div className="financial-metric">
          <div className="metric-label">Cap Rate</div>
          <div className="metric-value">{financials.capRate.toFixed(2)}%</div>
        </div>

        <div className="financial-metric">
          <div className="metric-label">Cash on Cash Return</div>
          <div className="metric-value">
            {financials.cashOnCash.toFixed(2)}%
          </div>
        </div>

        <button className="calculate-button" style={{ marginTop: '16px' }}>
          Recalculate with Custom Inputs
        </button>
      </div>
    </div>
  );
};

export default PropertyFinancials;
