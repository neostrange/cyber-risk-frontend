import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CRUDTable from "./components/CRUDTable"; // Import the generic CRUD component
import LinkAssetThreat from "./components/LinkAssetThreat";
import RiskScores from "./components/RiskScores";
import GraphVisualization from "./components/GraphVisualization";
import LinkAssetVulnerability from "./components/LinkAssetVulnerability";
import Dashboard from './components/Dashboard';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<h1>Welcome to Cybersecurity Risk Management</h1>} />

        {/* CRUD Routes for Different Nodes */}
        <Route
          path="/assets"
          element={<CRUDTable entity="Assets" apiEndpoint="http://172.25.161.89:5000/assets" />}
        />
        <Route
          path="/threats"
          element={<CRUDTable entity="Threats" apiEndpoint="http://172.25.161.89:5000/threats" />}
        />
        <Route
          path="/vulnerabilities"
          element={
            <CRUDTable entity="Vulnerabilities" apiEndpoint="http://172.25.161.89:5000/vulnerabilities" />
          }
        />
        <Route
          path="/controls"
          element={<CRUDTable entity="Controls" apiEndpoint="http://172.25.161.89:5000/controls" />}
        />
        <Route
          path="/incidents"
          element={<CRUDTable entity="Incidents" apiEndpoint="http://172.25.161.89:5000/incidents" />}
        />

        {/* Existing Functionalities */}
        <Route path="/link" element={<LinkAssetThreat />} />
        <Route path="/risks" element={<RiskScores />} />
        <Route path="/link-asset-vulnerability" element={<LinkAssetVulnerability />} /> {/* Add the new route */}
        <Route path="/graph" element={<GraphVisualization />} />  {/* New route */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
