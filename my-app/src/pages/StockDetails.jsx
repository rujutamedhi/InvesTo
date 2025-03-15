import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StockDetails = () => {
  const { symbol } = useParams(); // Get stock symbol from URL
  const [stock, setStock] = useState(null);
  const [recommendations, setRecommendations] = useState([]); // Store recommendations
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch stock details
    fetch(`http://127.0.0.1:5000/stockdetails/${symbol}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(`⚠️ ${data.error}`);
        } else {
          setStock(data);
        }
      })
      .catch(() => setError("🚨 Failed to fetch stock data."));

    // Fetch recommendation trends
    fetch(`http://127.0.0.1:5000/recommendation/${symbol}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) setRecommendations(data);
      })
      .catch(() => console.error("Error fetching recommendations"));
  }, [symbol]);

  if (error) return <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>;
  if (!stock) return <p>⏳ Loading stock details...</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>{stock.name} ({stock.symbol})</h2>
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <tbody>
          <tr><td>💰 <b>Current Price</b></td><td>${stock.current_price || 0}</td></tr>
          <tr><td>📈 <b>High</b></td><td>${stock.high || 0}</td></tr>
          <tr><td>📉 <b>Low</b></td><td>${stock.low || 0}</td></tr>
          <tr><td>📊 <b>Change</b></td><td>{stock.change || 0}%</td></tr>
          <tr><td>🏦 <b>Market Cap</b></td><td>${stock.market_cap || "N/A"}B</td></tr>
          <tr><td>📅 <b>Previous Close</b></td><td>${stock.prev_close || 0}</td></tr>
          <tr><td>🏛️ <b>Exchange</b></td><td>{stock.exchange || "N/A"}</td></tr>
        </tbody>
      </table>

      {/* Display Recommendation Trends */}
      <h3>📊 Recommendation Trends</h3>
      {recommendations.length > 0 ? (
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", marginTop: "10px" }}>
          <thead>
            <tr>
              <th>📅 Period</th>
              <th>🔵 Strong Buy</th>
              <th>🟢 Buy</th>
              <th>🟡 Hold</th>
              <th>🔴 Sell</th>
              <th>⚫ Strong Sell</th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map((rec, index) => (
              <tr key={index}>
                <td>{rec.period}</td>
                <td>{rec.strongBuy}</td>
                <td>{rec.buy}</td>
                <td>{rec.hold}</td>
                <td>{rec.sell}</td>
                <td>{rec.strongSell}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No recommendation data available.</p>
      )}
    </div>
  );
};

export default StockDetails;
