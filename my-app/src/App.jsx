import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Optional 404 page
import "./App.css";
import Analyticsdashboard from "../src/components/table";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Analyticsdashboard />} />
        <Route path="/table" element={<Analyticsdashboard />} />
        
      </Routes>
    </Router>
  );
}

export default App;
