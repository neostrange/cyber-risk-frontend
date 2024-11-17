import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://172.25.161.89:5000/dashboard-stats");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      <div style={{ display: "flex", justifyContent: "space-around", margin: "20px 0" }}>
        <div>
          <h3>Total Assets</h3>
          <p>{stats.total_assets}</p>
        </div>
        <div>
          <h3>Total Threats</h3>
          <p>{stats.total_threats}</p>
        </div>
        <div>
          <h3>Total Vulnerabilities</h3>
          <p>{stats.total_vulnerabilities}</p>
        </div>
        <div>
          <h3>Total Incidents</h3>
          <p>{stats.total_incidents}</p>
        </div>
        <div>
          <h3>High Risk Assets</h3>
          <p>{stats.high_risk_assets}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
