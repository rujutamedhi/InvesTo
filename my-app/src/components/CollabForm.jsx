import { useState } from "react";
import axios from "axios";
import logo from "../assets/images/rough.png";

const UserAuthForm = () => {
  const [formData, setFormData] = useState({ username: "", email: "", authority: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = name === "authority" ? value.replace(/\D/, "") : value; // Only allow numbers for authority
    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5006/send-email", formData);
      console.log("Response:", response.data);
      alert("Collaboration Created Successfully!");

      // Send confirmation email to user
      await axios.post("http://localhost:5006/application-email", { email: formData.email });

    } catch (error) {
      console.error("Error:", error.response?.data);
      alert("Failed to create collaboration.");
    } finally {
      setLoading(false);
    }
  };

  const partnerAuthority = formData.authority ? Math.max(0, 100 - parseInt(formData.authority)) : 100;

  return (
    <div style={styles.outercontainer}>
      <div style={styles.container}>
        <div style={styles.card}>
          <img src={logo} alt="Logo" style={styles.logo} />
          <h2 style={styles.title}>Collaboration Form</h2>
          <div style={styles.profileBox}>
            <img src={logo} alt="User Avatar" style={styles.avatar} />
            <p style={styles.username}>
              Signed in as <b>@yourusername</b>
            </p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required style={styles.input} />

            <label style={styles.label}>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required style={styles.input} />

            <div style={styles.labelContainer}>
              <label style={styles.label}>Your Authority Value</label>
              <span style={styles.tooltipIcon} title="This defines how much authority you have in collaboration."> ℹ️ </span>
            </div>
            <input type="number" name="authority" value={formData.authority} onChange={handleChange} required min="0" max="100" style={styles.input} />

            <div style={styles.labelContainer}>
              <label style={styles.label}>Partner's Authority Value</label>
              <span style={styles.tooltipIcon} title="This defines how much authority your partner has in collaboration."> ℹ️ </span>
            </div>
            <input type="number" value={partnerAuthority} disabled style={styles.inputDisabled} />

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Creating..." : "Invite Collaborator"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  outercontainer: { width: "80vw" },
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f9f9f9" },
  card: { width: "400px", padding: "24px", backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", textAlign: "center", border: "1px solid #ddd" },
  logo: { width: "50px", marginBottom: "10px" },
  title: { color: "#000", fontSize: "18px", marginBottom: "20px" },
  profileBox: { display: "flex", alignItems: "center", padding: "8px", backgroundColor: "#f1f1f1", borderRadius: "6px", marginBottom: "20px" },
  avatar: { width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" },
  username: { color: "#000", fontSize: "14px" },
  form: { display: "flex", flexDirection: "column" },
  label: { color: "#333", fontSize: "14px", textAlign: "left" },
  labelContainer: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "5px" },
  tooltipIcon: { cursor: "pointer", color: "#007bff", fontSize: "14px", marginLeft: "5px" },
  input: { padding: "10px", backgroundColor: "#ffffff", border: "1px solid #ccc", borderRadius: "6px", color: "#000", marginBottom: "15px" },
  inputDisabled: { padding: "10px", backgroundColor: "#f1f1f1", border: "1px solid #ccc", borderRadius: "6px", color: "#666", marginBottom: "15px", cursor: "not-allowed" },
  button: { padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "16px" },
};

export default UserAuthForm;
