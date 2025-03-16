import { useState } from "react";
import { useLocation } from "react-router-dom";

const BuyForm = () => {
  const location = useLocation();
  const { name, price } = location.state || { name: "Unknown", price: 100 }; // Default values if no data

  const [formData, setFormData] = useState({ shares: "", cost: price });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = value.replace(/\D/, ""); // Only allow numbers
    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Purchased Shares:", formData);
  };

  const totalAmount = formData.shares ? formData.shares * formData.cost : 0;

  return (
    <div style={styles.con}>
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Buy {name} Shares</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>No. of Shares</label>
          <input
            type="number"
            name="shares"
            value={formData.shares}
            onChange={handleChange}
            required
            min="1"
            style={styles.input}
          />

          <label style={styles.label}>Current Price (per share)</label>
          <input
            type="number"
            value={formData.cost}
            disabled
            style={styles.inputDisabled}
          />

          <label style={styles.label}>Total Amount</label>
          <input
            type="number"
            value={totalAmount}
            disabled
            style={styles.inputDisabled}
          />

          <button type="submit" style={styles.button}>Buy</button>
        </form>
      </div>
    </div></div>
  );
};






const styles = {
    con: {
    
    width: "80vw"
    
    },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
  },
  card: {
    width: "400px",
    padding: "24px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    border: "1px solid #ddd",
  },
  logo: {
    width: "50px",
    marginBottom: "10px",
  },
  title: {
    color: "#000",
    fontSize: "18px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    color: "#333",
    fontSize: "14px",
    textAlign: "left",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    backgroundColor: "#ffffff",
    border: "1px solid #ccc",
    borderRadius: "6px",
    color: "#000",
    marginBottom: "15px",
  },
  inputDisabled: {
    padding: "10px",
    backgroundColor: "#f1f1f1",
    border: "1px solid #ccc",
    borderRadius: "6px",
    color: "#666",
    marginBottom: "15px",
    cursor: "not-allowed",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
};
export default BuyForm;
