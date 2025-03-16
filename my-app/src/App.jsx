import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile"; 
import Sidebar from "./components/Sidebar"; // Import Sidebar
import SignupForm from "./components/SignUp";
import {  AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import "./App.css";
import StockDetails from "./pages/StockDetails";
import StockList from "./pages/StockList";
import BondsList from "./pages/BondList";
import Table from "./components/table"
import Collabform from "./components/CollabForm"
function Layout() {
  const location = useLocation(); // Get current route
  const showSidebar = location.pathname !== "/"; // Hide sidebar on Home page

  return (
    <div className="app-container" >
      <Sidebar/>
      {/* <Navbar />
      
      <div className="main-content">
        {showSidebar && <Sidebar />} Show Sidebar except on Home */}
        <div className="page-content">
          <AuthProvider>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
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