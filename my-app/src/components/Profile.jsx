import React, { useState } from "react";
import "../styles/profile.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Roland",
    lastName: "Donald",
    email: "rolandDonald@gmail.com",
    address: "3605 Parker Rd.",
    phone: "(405) 555-0128",
    dob: "1995-02-01",
    location: "Atlanta, USA",
    postalCode: "30301",
    gender: "Male",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    console.log("Profile Saved:", profileData);
  };

  const handleDiscardChanges = () => {
    setIsEditing(false);
    console.log("Changes Discarded");
  };

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="profile-section">
          <img src="https://i.pinimg.com/736x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg" alt="Profile" className="profile-pic" />
          <h3>Roland Donald</h3>
          <p>Cashier</p>
        </div>
        <nav>
          <button className="active">Create Collaboration</button>
          <button>Login & Password</button>
          <button>Log Out</button>
        </nav>
      </aside>

      {/* Profile Content */}
      <div className="profile-content">
        <h2>Personal Information</h2>

        {/* Gender Selection */}
        <div className="gender-selection">
          <label>
            <input type="radio" name="gender" value="Male" checked={profileData.gender === "Male"} disabled={!isEditing} onChange={handleInputChange} />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="Female" checked={profileData.gender === "Female"} disabled={!isEditing} onChange={handleInputChange} />
            Female
          </label>
        </div>

        {/* Profile Form */}
        <div className="form-row">
          <div className="input-group">
            <label>First Name</label>
            <input type="text" name="firstName" value={profileData.firstName} disabled={!isEditing} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <input type="text" name="lastName" value={profileData.lastName} disabled={!isEditing} onChange={handleInputChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" value={profileData.email} disabled />
            <span className="verified">✔ Verified</span>
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label>Address</label>
            <input type="text" name="address" value={profileData.address} disabled={!isEditing} onChange={handleInputChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label>Phone Number</label>
            <input type="text" name="phone" value={profileData.phone} disabled={!isEditing} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label>Date of Birth</label>
            <input type="date" name="dob" value={profileData.dob} disabled={!isEditing} onChange={handleInputChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label>Location</label>
            <input type="text" name="location" value={profileData.location} disabled={!isEditing} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label>Postal Code</label>
            <input type="text" name="postalCode" value={profileData.postalCode} disabled={!isEditing} onChange={handleInputChange} />
          </div>
        </div>

        {/* Buttons */}
        <div className="button-group">
          {!isEditing ? (
            <button className="edit-btn" onClick={handleEditClick}>Edit</button>
          ) : (
            <>
              <button className="discard-btn" onClick={handleDiscardChanges}>Discard Changes</button>
              <button className="save-btn" onClick={handleSaveChanges}>Save Changes</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
