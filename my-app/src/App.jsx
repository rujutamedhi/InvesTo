import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile"; 
import Sidebar from "./components/Sidebar"; 
import SignupForm from "./components/SignUp";
import {  AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import "./App.css";

function Layout() {
  const location = useLocation(); 
  const showSidebar = location.pathname !== "/"; 

  return (
    <div className="app-container">

        <div className="page-content">
          <AuthProvider/>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignupForm/>} />
            <Route path="/login" element={<Login/>} />
            </Routes>
            </AuthProvider>
        </div>
      </div>
    // </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;