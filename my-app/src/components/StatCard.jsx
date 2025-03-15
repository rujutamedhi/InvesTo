"use client"

import "../styles/statcard.css"

export default function StatCard({ title, value, change, changeType, period, chartColor }) {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <div>
          <h3 className="stat-card-title">{title}</h3>
          <p className="stat-card-value">{value}</p>
          <p className="stat-card-period">{period}</p>
        </div>
        <div className={`stat-change ${changeType === "positive" ? "positive" : "negative"}`}>{change}</div>
      </div>

      <div className="stat-chart">
        {/* Simple chart representation */}
        <div className="chart-bars">
          {Array.from({ length: 12 }).map((_, i) => {
            const height = 20 + Math.random() * 60
            return <div key={i} className={`chart-bar ${chartColor}`} style={{ height: `${height}%` }}></div>
          })}
        </div>
      </div>
    </div>
  )
}

