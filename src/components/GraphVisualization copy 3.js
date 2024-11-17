import React, { useEffect, useState } from "react";
import ForceGraph3D from "react-force-graph-3d";

const GraphVisualization = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [filter, setFilter] = useState('All'); // State for filtering nodes

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await fetch("http://172.25.161.89:5000/graph");
        const data = await response.json();
        setGraphData(data);
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    };

    fetchGraphData();
  }, []);

  // Function to get node color based on labels
  const getNodeColor = (node) => {
    if (node.labels.includes("Asset")) return "lightblue";
    if (node.labels.includes("Vulnerability")) return "orange";
    if (node.labels.includes("Threat")) return "red";
    if (node.labels.includes("Control")) return "green";
    return "gray"; // Default color
  };

  // Function to get edge color based on label
  const getLinkColor = (link) => {
    switch (link.label) {
      case 'DEPENDS_ON': return 'blue';
      case 'HAS_VULNERABILITY': return 'red';
      case 'EXPOSED_TO': return 'orange';
      case 'MITIGATED_BY': return 'green';
      default: return 'gray';
    }
  };

  // Function to filter nodes based on selected type
  const filteredNodes = filter === 'All' ? graphData.nodes : graphData.nodes.filter(node => node.labels.includes(filter));

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}>
        <label>Filter Nodes:</label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="All">All</option>
          <option value="Asset">Assets</option>
          <option value="Vulnerability">Vulnerabilities</option>
          <option value="Threat">Threats</option>
          <option value="Control">Controls</option>
        </select>
      </div>

      <ForceGraph3D
        graphData={{ nodes: filteredNodes, links: graphData.links }}
        nodeAutoColorBy={getNodeColor} // Use the custom color function
        nodeLabel={(node) => `
          Name: ${node.properties.assetName || node.properties.vulnName || node.properties.name || ''}
          Type: ${node.labels.join(', ')}
          Risk Score: ${node.properties.riskScore || ''}
        `}
        linkLabel={(link) => link.label} // Display relationship labels
        linkColor={getLinkColor} // Use the custom link color function
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.005}
      />

      <div style={{ position: "absolute", bottom: 10, left: 10, zIndex: 1, background: "white", padding: "10px", borderRadius: "5px" }}>
        <h4>Legend</h4>
        <p><span style={{ color: 'lightblue' }}>●</span> Assets</p>
        <p><span style={{ color: 'orange' }}>●</span> Vulnerabilities</p>
        <p><span style={{ color: 'red' }}>●</span> Threats</p>
        <p><span style={{ color: 'green' }}>●</span> Controls</p>
        <h4>Statistics</h4>
        <p>Total Nodes: {graphData.nodes.length}</p>
        <p>Total Links: {graphData.links.length}</p>
        <p>Assets: {graphData.nodes.filter(node => node.labels.includes("Asset")).length}</p>
        <p>Vulnerabilities: {graphData.nodes.filter(node => node.labels.includes("Vulnerability")).length}</p>
        <p>Threats: {graphData.nodes.filter(node => node.labels.includes("Threat")).length}</p>
        <p>Controls: {graphData.nodes.filter(node => node.labels.includes("Control")).length}</p>
      </div>
    </div>
  );
};

export default GraphVisualization;