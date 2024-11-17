import React, { useEffect, useState } from "react";
import ForceGraph3D from "react-force-graph-3d";

const GraphVisualization = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    // Fetch graph data from the backend
    const fetchGraphData = async () => {
      try {
        const response = await fetch("http://172.25.161.89:5000/graph");
        const data = await response.json();
        setGraphData(data);  // Store the graph data (nodes and links)
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    };

    fetchGraphData();  // Fetch the graph data when the component mounts
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <ForceGraph3D
        graphData={graphData}
        nodeAutoColorBy="type"   // Color nodes based on type
        nodeLabel={(node) => `
          Name: ${node.properties.assetName || node.properties.vulnName || node.properties.name || ''}
          Type: ${node.labels.join(', ')}
          Risk Score: ${node.properties.riskScore || ''}
        `} // Display node details on hover
        linkLabel={(link) => link.label}  // Display relationship labels
        linkColor={(link) => {
          switch (link.label) {
            case 'DEPENDS_ON': return 'blue';
            case 'HAS_VULNERABILITY': return 'red';
            case 'EXPOSED_TO': return 'orange';
            case 'MITIGATED_BY': return 'green';
            default: return 'gray';
          }
        }} // Customize link colors based on their label
        linkDirectionalParticles={2}  // Visual effects for links
        linkDirectionalParticleSpeed={0.005}
      />
    </div>
  );
};

export default GraphVisualization;