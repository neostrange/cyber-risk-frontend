import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#f4f4f4" }}>
      <ul style={{ listStyleType: "none", display: "flex", gap: "15px", padding: 0 }}>
        <li>
          <Link to="/" style={{ textDecoration: "none", color: "#333" }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/dashboard" style={{ textDecoration: "none", color: "#333" }}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/assets" style={{ textDecoration: "none", color: "#333" }}>
            Assets
          </Link>
        </li>
        <li>
          <Link to="/threats" style={{ textDecoration: "none", color: "#333" }}>
            Threats
          </Link>
        </li>
        <li>
          <Link to="/vulnerabilities" style={{ textDecoration: "none", color: "#333" }}>
            Vulnerabilities
          </Link>
        </li>
        <li>
          <Link to="/controls" style={{ textDecoration: "none", color: "#333" }}>
            Controls
          </Link>
        </li>
        <li>
          <Link to="/incidents" style={{ textDecoration: "none", color: "#333" }}>
            Incidents
          </Link>
        </li>
        <li>
          <Link to="/link" style={{ textDecoration: "none", color: "#333" }}>
            Link Assets & Threats
          </Link>
        </li>
        <li>
          <Link to="/risks" style={{ textDecoration: "none", color: "#333" }}>
            Risk Scores
          </Link>
        </li>
        <li>
          <Link to="/graph" style={{ textDecoration: "none", color: "#333" }}>
            Graph Visualization
          </Link>
        </li>
        <li>
          <Link to="/link-asset-vulnerability" style={{ textDecoration: "none", color: "#333" }}>
            Link Asset & Vulnerability
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
