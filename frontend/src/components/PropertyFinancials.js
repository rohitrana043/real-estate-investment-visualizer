import React, { useState, useEffect } from 'react';

// Expense Details Modal Component - separate from main component
const ExpenseDetailsModal = ({
  isOpen,
  onClose,
  expenses,
  financials,
  formatCurrency,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Monthly Expense Breakdown</h3>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <table className="expense-table">
            <thead>
              <tr>
                <th>Expense</th>
                <th>Amount</th>
                <th>% of Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mortgage (P&I)</td>
                <td>{formatCurrency(financials.mortgage)}</td>
                <td>
                  {(
                    (financials.mortgage / financials.monthlyCosts) *
                    100
                  ).toFixed(1)}
                  %
                </td>
              </tr>
              <tr>
                <td>Property Tax</td>
                <td>{formatCurrency(expenses.propertyTax)}</td>
                <td>
                  {(
                    (expenses.propertyTax / financials.monthlyCosts) *
                    100
                  ).toFixed(1)}
                  %
                </td>
              </tr>
              <tr>
                <td>Insurance</td>
                <td>{formatCurrency(expenses.insurance)}</td>
                <td>
                  {(
                    (expenses.insurance / financials.monthlyCosts) *
                    100
                  ).toFixed(1)}
                  %
                </td>
              </tr>
              <tr>
                <td>Maintenance</td>
                <td>{formatCurrency(expenses.maintenance)}</td>
                <td>
                  {(
                    (expenses.maintenance / financials.monthlyCosts) *
                    100
                  ).toFixed(1)}
                  %
                </td>
              </tr>
              <tr>
                <td>Property Management</td>
                <td>{formatCurrency(expenses.propertyManagement)}</td>
                <td>
                  {(
                    (expenses.propertyManagement / financials.monthlyCosts) *
                    100
                  ).toFixed(1)}
                  %
                </td>
              </tr>
              <tr>
                <td>Utilities</td>
                <td>{formatCurrency(expenses.utilities)}</td>
                <td>
                  {(
                    (expenses.utilities / financials.monthlyCosts) *
                    100
                  ).toFixed(1)}
                  %
                </td>
              </tr>
              <tr>
                <td>HOA Fees</td>
                <td>{formatCurrency(expenses.hoa)}</td>
                <td>
                  {((expenses.hoa / financials.monthlyCosts) * 100).toFixed(1)}%
                </td>
              </tr>
              <tr>
                <td>Vacancy Allowance</td>
                <td>{formatCurrency(expenses.vacancy)}</td>
                <td>
                  {((expenses.vacancy / financials.monthlyCosts) * 100).toFixed(
                    1
                  )}
                  %
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <strong>Total Monthly Expenses</strong>
                </td>
                <td>
                  <strong>{formatCurrency(financials.monthlyCosts)}</strong>
                </td>
                <td>
                  <strong>100%</strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Custom Inputs Modal Component - separate from main component
const CustomInputsModal = ({
  isOpen,
  onClose,
  currentValues,
  onSave,
  formatCurrency,
  property,
}) => {
  const [customOfferPrice, setCustomOfferPrice] = useState(
    currentValues.offerPrice
  );
  const [customRehabCosts, setCustomRehabCosts] = useState(
    currentValues.rehabCosts
  );
  const [customDownPayment, setCustomDownPayment] = useState(
    currentValues.downPaymentPercent
  );
  const [customInterestRate, setCustomInterestRate] = useState(
    currentValues.interestRate
  );
  const [customLoanTerm, setCustomLoanTerm] = useState(currentValues.loanTerm);
  const [customRent, setCustomRent] = useState(currentValues.monthlyRent);

  // Update local state when parent values change
  useEffect(() => {
    setCustomOfferPrice(currentValues.offerPrice);
    setCustomRehabCosts(currentValues.rehabCosts);
    setCustomDownPayment(currentValues.downPaymentPercent);
    setCustomInterestRate(currentValues.interestRate);
    setCustomLoanTerm(currentValues.loanTerm);
    setCustomRent(currentValues.monthlyRent);
  }, [currentValues, isOpen]);

  const handleSaveCustomInputs = () => {
    onSave({
      offerPrice: customOfferPrice,
      rehabCosts: customRehabCosts,
      downPaymentPercent: customDownPayment,
      interestRate: customInterestRate,
      loanTerm: customLoanTerm,
      monthlyRent: customRent,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Customize Investment Inputs</h3>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="custom-input-group">
            <label>Offer Price:</label>
            <input
              type="number"
              value={customOfferPrice}
              onChange={(e) => setCustomOfferPrice(Number(e.target.value))}
              min={property.listPrice * 0.7}
              max={property.listPrice * 1.3}
            />
            <span>{formatCurrency(customOfferPrice)}</span>
          </div>

          <div className="custom-input-group">
            <label>Rehab Costs:</label>
            <input
              type="number"
              value={customRehabCosts}
              onChange={(e) => setCustomRehabCosts(Number(e.target.value))}
              min={0}
              max={200000}
            />
            <span>{formatCurrency(customRehabCosts)}</span>
          </div>

          <div className="custom-input-group">
            <label>Down Payment (%):</label>
            <input
              type="number"
              value={customDownPayment}
              onChange={(e) => setCustomDownPayment(Number(e.target.value))}
              min={5}
              max={100}
              step={1}
            />
            <span>{customDownPayment}%</span>
          </div>

          <div className="custom-input-group">
            <label>Interest Rate (%):</label>
            <input
              type="number"
              value={customInterestRate}
              onChange={(e) => setCustomInterestRate(Number(e.target.value))}
              min={1}
              max={15}
              step={0.1}
            />
            <span>{customInterestRate}%</span>
          </div>

          <div className="custom-input-group">
            <label>Loan Term (years):</label>
            <input
              type="number"
              value={customLoanTerm}
              onChange={(e) => setCustomLoanTerm(Number(e.target.value))}
              min={5}
              max={30}
              step={5}
            />
            <span>{customLoanTerm} years</span>
          </div>

          <div className="custom-input-group">
            <label>Monthly Rent:</label>
            <input
              type="number"
              value={customRent}
              onChange={(e) => setCustomRent(Number(e.target.value))}
              min={0}
              max={20000}
            />
            <span>{formatCurrency(customRent)}</span>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSaveCustomInputs}>
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Main PropertyFinancials component
const PropertyFinancials = ({ property }) => {
  // State for financial inputs
  const [offerPrice, setOfferPrice] = useState(property.listPrice);
  const [rehabCosts, setRehabCosts] = useState(25000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(7);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyRent, setMonthlyRent] = useState(property.monthlyRent || 0);
  const [showExpenseDetails, setShowExpenseDetails] = useState(false);
  const [showCustomInputs, setShowCustomInputs] = useState(false);

  // Expense breakdown
  const [expenses, setExpenses] = useState({
    propertyTax: 0,
    insurance: 0,
    maintenance: 0,
    propertyManagement: 0,
    utilities: 0,
    hoa: 0,
    vacancy: 0,
  });

  // Financial results
  const [financials, setFinancials] = useState({
    monthlyRent: 0,
    monthlyCosts: 0,
    mortgage: 0,
    cashFlow: 0,
    annualCashFlow: 0,
    initialInvestment: 0,
    cashOnCash: 0,
    capRate: 0,
    netOperatingIncome: 0,
  });

  // Initialize monthly rent from property
  useEffect(() => {
    if (property) {
      setMonthlyRent(property.monthlyRent || estimateRent(property));
    }
  }, [property]);

  // Estimate rent based on property details
  const estimateRent = (property) => {
    // Simple estimation based on property details
    // In a real app, you might use more sophisticated algorithms or data
    const baseRent = property.bedrooms * 700 + property.bathrooms * 300;
    const locationFactor = property.city === 'Toronto' ? 1.5 : 1.2;
    const sizeFactor = property.squareFeet / 500;

    return Math.round(baseRent * locationFactor * sizeFactor);
  };

  // Calculate financial metrics
  useEffect(() => {
    calculateFinancials();
  }, [
    offerPrice,
    rehabCosts,
    downPaymentPercent,
    interestRate,
    loanTerm,
    monthlyRent,
    expenses,
  ]);

  // Format currency
  const formatCurrency = (value) => {
    if (isNaN(value)) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Calculate monthly mortgage payment
  const calculateMortgage = () => {
    const downPayment = offerPrice * (downPaymentPercent / 100);
    const loanAmount = offerPrice - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const months = loanTerm * 12;

    if (monthlyInterestRate === 0) return loanAmount / months;

    // Calculate monthly mortgage payment (P&I)
    const mortgage =
      (loanAmount *
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months))) /
      (Math.pow(1 + monthlyInterestRate, months) - 1);

    return mortgage;
  };

  // Calculate all expenses
  const calculateExpenses = () => {
    // Property tax (annually divided by 12)
    const propertyTax = (offerPrice * (property.propertyTax || 0.8)) / 100 / 12;

    // Insurance (estimate based on property value)
    const insurance = (offerPrice * 0.001) / 12;

    // Maintenance (1% of property value annually / 12)
    const maintenance = (offerPrice * 0.01) / 12;

    // Property management (typically 8-10% of monthly rent)
    const propertyManagement = monthlyRent * 0.08;

    // Utilities (if owner pays any)
    const utilities = 0; // Default to 0, tenant pays

    // HOA fees (if applicable)
    const hoa = 0; // Default to 0, assuming no HOA

    // Vacancy allowance (typically 5% of rent)
    const vacancy = monthlyRent * 0.05;

    const updatedExpenses = {
      propertyTax,
      insurance,
      maintenance,
      propertyManagement,
      utilities,
      hoa,
      vacancy,
    };

    setExpenses(updatedExpenses);

    return Object.values(updatedExpenses).reduce(
      (sum, expense) => sum + expense,
      0
    );
  };

  const calculateFinancials = () => {
    // Calculate mortgage
    const mortgage = calculateMortgage();

    // Calculate other expenses
    const otherExpenses = calculateExpenses();

    // Total monthly costs
    const totalMonthlyCost = mortgage + otherExpenses;

    // Cash flow calculations
    const cashFlow = monthlyRent - totalMonthlyCost;
    const annualCashFlow = cashFlow * 12;

    // Investment calculations
    const downPayment = offerPrice * (downPaymentPercent / 100);
    const closingCosts = offerPrice * 0.02; // Estimate 2% for closing costs
    const initialInvestment = downPayment + rehabCosts + closingCosts;

    // Return calculations
    const cashOnCash = (annualCashFlow / initialInvestment) * 100;

    // Cap rate calculation
    const annualGrossIncome = monthlyRent * 12;
    const annualExpenses = otherExpenses * 12;
    const netOperatingIncome = annualGrossIncome - annualExpenses; // NOI excludes mortgage
    const capRate = (netOperatingIncome / offerPrice) * 100;

    setFinancials({
      monthlyRent: monthlyRent,
      monthlyCosts: totalMonthlyCost,
      mortgage: mortgage,
      cashFlow: cashFlow,
      annualCashFlow: annualCashFlow,
      initialInvestment: initialInvestment,
      cashOnCash: cashOnCash,
      capRate: capRate,
      netOperatingIncome: netOperatingIncome,
    });
  };

  // Handle custom inputs save
  const handleSaveCustomInputs = (customValues) => {
    setOfferPrice(customValues.offerPrice);
    setRehabCosts(customValues.rehabCosts);
    setDownPaymentPercent(customValues.downPaymentPercent);
    setInterestRate(customValues.interestRate);
    setLoanTerm(customValues.loanTerm);
    setMonthlyRent(customValues.monthlyRent);
    setShowCustomInputs(false);
  };

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

        <div className="financial-input">
          <label>Down Payment</label>
          <input
            type="range"
            min={5}
            max={50}
            step={1}
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
            className="range-slider"
          />
          <span>{downPaymentPercent}%</span>
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
          <button
            className="details-button"
            onClick={() => setShowExpenseDetails(true)}
          >
            View expense details
          </button>
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

        <button
          className="calculate-button"
          style={{ marginTop: '16px' }}
          onClick={() => setShowCustomInputs(true)}
        >
          Recalculate with Custom Inputs
        </button>
      </div>

      {/* Modals */}
      <ExpenseDetailsModal
        isOpen={showExpenseDetails}
        onClose={() => setShowExpenseDetails(false)}
        expenses={expenses}
        financials={financials}
        formatCurrency={formatCurrency}
      />

      <CustomInputsModal
        isOpen={showCustomInputs}
        onClose={() => setShowCustomInputs(false)}
        currentValues={{
          offerPrice,
          rehabCosts,
          downPaymentPercent,
          interestRate,
          loanTerm,
          monthlyRent,
        }}
        onSave={handleSaveCustomInputs}
        formatCurrency={formatCurrency}
        property={property}
      />
    </div>
  );
};

export default PropertyFinancials;
