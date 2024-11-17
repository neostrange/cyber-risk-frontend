import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CRUDTable from "./components/CRUDTable";
import LinkAssetThreat from "./components/LinkAssetThreat";
import RiskScores from "./components/RiskScores";
import GraphVisualization from "./components/GraphVisualization";
import LinkAssetVulnerability from "./components/LinkAssetVulnerability";
import Dashboard from './components/Dashboard';
import './App.css'; // Ensure you have this CSS file

function App() {
  console.log("env file :", process.env.REACT_APP_API_URL)
  return (
    <Router>
      <header>
        <h1 style={{ color: '#000000', fontSize: '2.5em' }}>Cybersecurity Risk Management Dashboard</h1>
        <Navbar />
      </header>

      <main>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<h1>Welcome to Cybersecurity Risk Management</h1>} />

          {/* CRUD Routes for Different Nodes */}
          <Route path="/assets" element={<CRUDTable entity="Assets" apiEndpoint={`${process.env.REACT_APP_API_URL}/assets`} />} />
          <Route path="/threats" element={<CRUDTable entity="Threats" apiEndpoint={`${process.env.REACT_APP_API_URL}/threats`} />} />
          <Route path="/vulnerabilities" element={<CRUDTable entity="Vulnerabilities" apiEndpoint={`${process.env.REACT_APP_API_URL}/vulnerabilities`} />} />
          <Route path="/controls" element={<CRUDTable entity="Controls" apiEndpoint={`${process.env.REACT_APP_API_URL}/controls`} />} />
          <Route path="/incidents" element={<CRUDTable entity="Incidents" apiEndpoint={`${process.env.REACT_APP_API_URL}/incidents`} />} />

          {/* Existing Functionalities */}
          <Route path="/link" element={<LinkAssetThreat />} />
          <Route path="/risks" element={<RiskScores />} />
          <Route path="/link-asset-vulnerability" element={<LinkAssetVulnerability />} />
          <Route path="/graph" element={<GraphVisualization />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      <footer style={{ backgroundColor: '#f8f9fa', padding: '20px', textAlign: 'center' }}>
        <p>&copy; 2023 Semiatech. All rights reserved.</p>
        <p>
          <a href="/privacy-policy">Privacy Policy</a> | 
          <a href="/terms-of-service">Terms of Service</a> | 
          <a href="/contact">Contact Us</a>
        </p>
      </footer>
    </Router>
  );
}

export default App;