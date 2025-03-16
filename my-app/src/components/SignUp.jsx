import React, { useState } from "react";
import "../styles/SignupForm.css";

const SignupForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone_number: "",
    age: "",
    city: "",
    gender: "",
    risk_profile: "Low",
    pan_card: null,
    aadhaar_card: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/api/user/signup", {
        method: "POST",
        headers: {
          "Accept": "application/json",
        },
        body: formDataToSend,
      });
    
      if (!response.ok) {
        throw new Error(`Signup failed: ${response.status}`);
      }
    
      const data = await response.json();
      console.log("Signup successful:", data);
    
    } catch (err) {
      console.error("Signup failed:", err.message);
      setError("Signup failed. Please try again.");
    }
    
  };

  const progressPercentage = (step / 3) * 100;

  return (
    <div style={{width:"80vw"}}>
    <div className="signup-page"> 
      <div className="signup-card">
        <div className="card-header">
          <h2 className="card-title">Investo Signup</h2>
          <p className="card-description">Create your account to start investing</p>
          
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <div className="step-indicators">
            <span className={step >= 1 ? "active" : ""}>Account</span>
            <span className={step >= 2 ? "active" : ""}>Profile</span>
            <span className={step >= 3 ? "active" : ""}>Documents</span>
          </div>
        </div>

        {error && (
          <div className="alert error">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="alert success">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <p>{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="card-content">
            {step === 1 && (
              <div className="form-step">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input 
                    id="username" 
                    name="username" 
                    placeholder="johndoe" 
                    value={formData.username}
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    value={formData.email}
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input 
                    id="password" 
                    name="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={formData.password}
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="form-step">
                <div className="form-group">
                  <label htmlFor="phone_number">Phone Number</label>
                  <input 
                    id="phone_number" 
                    name="phone_number" 
                    placeholder="+91 9876543210" 
                    value={formData.phone_number}
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input 
                      id="age" 
                      name="age" 
                      type="number" 
                      placeholder="25" 
                      value={formData.age}
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input 
                      id="city" 
                      name="city" 
                      placeholder="Mumbai" 
                      value={formData.city}
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select 
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="risk_profile">Risk Profile</label>
                    <select 
                      id="risk_profile"
                      name="risk_profile"
                      value={formData.risk_profile}
                      onChange={handleChange}
                      required
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="form-step">
                <div className="form-group">
                  <label htmlFor="pan_card">PAN Card</label>
                  <div className="file-input-container">
                    <input
                      id="pan_card"
                      name="pan_card"
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={handleFileChange}
                      className="file-input"
                      required
                    />
                    <svg className="upload-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                  </div>
                  <p className="helper-text">
                    Upload a clear scan or photo of your PAN card (JPG, PNG or PDF)
                  </p>
                </div>
                <div className="form-group">
                  <label htmlFor="aadhaar_card">Aadhaar Card</label>
                  <div className="file-input-container">
                    <input
                      id="aadhaar_card"
                      name="aadhaar_card"
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={handleFileChange}
                      className="file-input"
                      required
                    />
                    <svg className="upload-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                  </div>
                  <p className="helper-text">
                    Upload a clear scan or photo of your Aadhaar card (JPG, PNG or PDF)
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="card-footer">
            {step > 1 ? (
              <button 
                type="button" 
                className="btn btn-outline" 
                onClick={prevStep}
                disabled={isSubmitting}
              >
                <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            {step < 3 ? (
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={nextStep}
              >
                Next
                <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            ) : (
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Complete Registration"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default SignupForm;
