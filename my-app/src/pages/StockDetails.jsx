import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StockDetails = () => {
  const { symbol } = useParams(); // Get stock symbol from URL
  const [stock, setStock] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/stockdetails/${symbol}`) // Fetch from Flask backend
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setStock(data);
        }
      })
      .catch(() => setError("Failed to fetch stock data"));
  }, [symbol]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!stock) return <p>Loading...</p>;

  return (
    <div>
      <h2>{stock.name} ({stock.symbol})</h2>
      <table border="1" cellPadding="10">
        <tbody>
          <tr><td>💰 <b>Current Price</b></td><td>${stock.current_price}</td></tr>
          <tr><td>📈 <b>High</b></td><td>${stock.high}</td></tr>
          <tr><td>📉 <b>Low</b></td><td>${stock.low}</td></tr>
          <tr><td>📊 <b>Change</b></td><td>{stock.change}%</td></tr>
          <tr><td>🏦 <b>Market Cap</b></td><td>${stock.market_cap}B</td></tr>
          <tr><td>📅 <b>Previous Close</b></td><td>${stock.prev_close}</td></tr>
          <tr><td>🏛️ <b>Exchange</b></td><td>{stock.exchange}</td></tr>
          
        </tbody>
      </table>
    </div>
  );
};

export default StockDetails;
