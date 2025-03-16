import React, { useState, useEffect,useContext } from "react";
import { useParams } from "react-router-dom"; // For extracting email from URL
import "../styles/profile.css";
import { AuthContext } from "../context/AuthContext";
const Profile = () => {
  const { email } = useParams(); // Extract email from URL
  const [isEditing, setIsEditing] = useState(false);
  const { login, user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    dob: "",
    location: "",
    postalCode: "",
    gender: "",
  });

  // Fetch profile data when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/user/profile/${user}`);
        const data = await response.json();

        if (data.status === "success") {
          setProfileData({
            firstName: data.data.username.split(" ")[0] || "",
            lastName: data.data.username.split(" ")[1] || "",
            email: data.data.email,
            address: data.data.address || "",
            phone: data.data.phone_number || "",
            dob: data.data.age || "",
            location: data.data.city || "",
            postalCode: data.data.postal_code || "",
            gender: data.data.gender || "",
          });
        } else {
          console.error("Profile not found");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleEditClick = () => setIsEditing(true);
  const handleSaveChanges = () => {
    setIsEditing(false);
    console.log("Profile Saved:", profileData);
  };
  const handleDiscardChanges = () => setIsEditing(false);

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h2>Personal Information</h2>
        <div className="profile-section">
          <img src="https://i.pinimg.com/736x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg" alt="Profile" className="profile-pic" />
          <h3>{profileData.firstName} {profileData.lastName}</h3>
        </div>

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

        <nav className="collaboration">
          <h2>Collaboration</h2>
          <button className="active">Create Collaboration</button>
          <button>Login & Password</button>
          <button>Log Out</button>
        </nav>
      </div>
    </div>
  );
};

export default Profile;