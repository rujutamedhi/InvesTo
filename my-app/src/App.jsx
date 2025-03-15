import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import StockDetails from "./pages/StockDetails";
import StockList from "./pages/StockList";
// Import Components
import Dashboard from "./components/Dashboard";
import Analyticsdashboard from "./components/table";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router> {/* ✅ Wrap with Router */}
      <Routes>
        <Route path="/" element={<Analyticsdashboard />} />
        <Route path="/table" element={<Analyticsdashboard />} />
        <Route path="/stock/:symbol" element={<StockDetails />} />
        <Route path="/stocklist" element={<StockList />} />
      </Routes>
    </Router>
  );
}

export default App;
