import { useState } from "react";
import "../styles/profile.css"; // Import CSS for styling

export default function Profile() {
  const [user, setUser] = useState({
    username: "john_doe",
    email: "john@example.com",
    phone_number: "9876543210",
    age: 28,
    city: "New York",
    gender: "Male",
    risk_profile: "Medium",
    wallet_balance: 1500.75,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save Changes
  const handleSave = () => {
    setUser({ ...formData });
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile Information</h2>

      <div className="profile-details">
        {Object.keys(user).map((key) => (
          <div key={key} className="profile-row">
            <label className="profile-label">{key.replace("_", " ")}:</label>
            {isEditing ? (
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              <span className="profile-value">{user[key]}</span>
            )}
          </div>
        ))}
      </div>

      <div className="profile-buttons">
        {isEditing ? (
          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        ) : (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        )}
      </div>

      <div className="collab-container">
        <button className="collab-btn">Create a Collaboration Team</button>
      </div>
    </div>
  );
}
