"use client"

import "../styles/pageviewschart.css"

export default function PageViewsChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]

  return (
    <div className="pageviews-chart">
      <div className="pageviews-chart-header">
        <div>
          <h3 className="pageviews-chart-title">Page views and downloads</h3>
          <div className="pageviews-chart-value">
            <p className="total-value">1.3M</p>
            <span className="value-change negative">-8%</span>
          </div>
          <p className="pageviews-chart-period">Page views and downloads for the last 6 months</p>
        </div>
      </div>

      <div className="bar-chart-container">
        <div className="bar-chart">
          {months.map((month, i) => (
            <div key={month} className="bar-column">
              <div className="bar-wrapper">
                <div className="bar-top" style={{ height: `${100 + Math.random() * 100}px` }}></div>
                <div className="bar-bottom" style={{ height: `${50 + Math.random() * 50}px` }}></div>
              </div>
              <span className="bar-label">{month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

