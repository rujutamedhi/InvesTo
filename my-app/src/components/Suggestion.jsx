// import { useState, useEffect } from "react";

// const Suggestions = () => {
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   const budget = 50000; // Replace with user input
//   const risk = "low"; // Replace with user-selected risk level

//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       try {
//         const response = await fetch(
//           `http://127.0.0.1:8000/api/suggestions/?budget=${budget}&risk=${risk}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch suggestions");
//         }
//         const data = await response.json();
//         setSuggestions(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSuggestions();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h2>Stock Suggestions</h2>
//       <ul>
//         {suggestions.map((suggestion, index) => (
//           <li key={index}>{suggestion}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Suggestions;



import { useState } from "react";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [budget, setBudget] = useState(""); // User input for budget
  const [risk, setRisk] = useState("low"); // User input for risk level

  const fetchSuggestions = async () => {
    if (!budget) {
      setError("Please enter a budget");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/suggestions/?budget=${budget}&risk=${risk}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }
      const data = await response.json();
      setSuggestions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Stock Suggestions</h2>
      <div>
        <label>
          Budget: 
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Enter budget"
          />
        </label>
        <label>
          Risk Level: 
          <select value={risk} onChange={(e) => setRisk(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <button onClick={fetchSuggestions}>Get Suggestions</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};

export default Suggestions;
