"use client"

import { useState } from "react"
import Sidebar from "./Sidebar"
import StatCard from "./StatCard"
import InvestmentSummary from "./InvestmentSummary"
import PageViewsChart from "./PageViewsChart"
import "../styles/dashboard.css"

export default function Dashboard() {
  const [currentDate] = useState("Apr 17, 2023")

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <header className="dashboard-header">
          <div className="header-title">
            <h1 className="dashboard-title">Dashboard</h1>
            <span className="header-separator">›</span>
            <h2 className="page-title">Home</h2>
          </div>

          <div className="header-actions">
            <div className="search-container">
              <svg
                className="search-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" placeholder="Search..." className="search-input" />
            </div>

            <button className="date-button">
              <span>{currentDate}</span>
            </button>

            <button className="notification-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span className="notification-indicator"></span>
            </button>
          </div>
        </header>

        <main className="dashboard-main">
          <h2 className="section-title">Overview</h2>

          <div className="stat-cards">
            <StatCard
              title="Total Invested"
              value="$250K"
              change="+25%"
              changeType="positive"
              period="Last 30 days"
              chartColor="green"
            />

            <StatCard
              title="Profit Amount"
              value="$45K"
              change="-25%"
              changeType="negative"
              period="Last 30 days"
              chartColor="red"
            />

            <StatCard
              title="Current Balance"
              value="$280K"
              change="+5%"
              changeType="positive"
              period="Last 30 days"
              chartColor="gray"
            />
          </div>

          <div className="chart-container">
            <InvestmentSummary />
            <PageViewsChart />
          </div>

          <div className="details-section">
            <h2 className="section-title">Details</h2>
            {/* Additional details section could go here */}
          </div>
        </main>
      </div>
    </div>
  )
}

