"use client"

import "../styles/investmentsummary.css"

export default function InvestmentSummary() {
  return (
    <div className="investment-summary">
      <div className="investment-summary-header">
        <div>
          <h3 className="investment-summary-title">Investment Summary</h3>
          <div className="investment-summary-value">
            <p className="total-value">$325,000</p>
            <span className="value-change positive">+35%</span>
          </div>
          <p className="investment-summary-period">Total portfolio value for the last 30 days</p>
        </div>
      </div>

      <div className="investment-metrics">
        <div className="investment-metric">
          <div className="metric-label">
            <div className="metric-indicator blue"></div>
            <span>Total Invested</span>
          </div>
          <span className="metric-value">$250,000</span>
        </div>

        <div className="investment-metric">
          <div className="metric-label">
            <div className="metric-indicator green"></div>
            <span>Profit Amount</span>
          </div>
          <span className="metric-value positive">+$45,000</span>
        </div>

        <div className="investment-metric">
          <div className="metric-label">
            <div className="metric-indicator red"></div>
            <span>Loss Amount</span>
          </div>
          <span className="metric-value negative">-$15,000</span>
        </div>

        <div className="investment-metric">
          <div className="metric-label">
            <div className="metric-indicator purple"></div>
            <span>Current Balance</span>
          </div>
          <span className="metric-value">$280,000</span>
        </div>
      </div>

      <div className="investment-chart-container">
        <div className="investment-chart">
          <svg viewBox="0 0 100 20" className="area-chart">
            <path d="M0,10 Q10,5 20,10 T40,10 T60,10 T80,5 T100,10 V20 H0 Z" className="area-path" />
          </svg>

          {/* Chart lines */}
          <div className="chart-grid">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="chart-grid-line"></div>
            ))}
          </div>
        </div>

        {/* X-axis labels */}
        <div className="chart-labels">
          <span>Apr 5</span>
          <span>Apr 10</span>
          <span>Apr 15</span>
          <span>Apr 20</span>
          <span>Apr 25</span>
          <span>Apr 30</span>
        </div>
      </div>
    </div>
  )
}

