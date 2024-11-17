import React, { useEffect, useState } from "react";
import ForceGraph3D from "react-force-graph-3d";
import Modal from 'react-modal'; // Import modal for detailed view
import './GraphVisualization.css'; // Optional: import a CSS file for styling

const GraphVisualization = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [filter, setFilter] = useState('All');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);

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

  const getNodeColor = (node) => {
    if (node.labels.includes("Asset")) return "lightblue";
    if (node.labels.includes("Vulnerability")) return "orange";
    if (node.labels.includes("Threat")) return "red";
    if (node.labels.includes("Control")) return "green";
    return "gray";
  };

  const getLinkColor = (link) => {
    switch (link.label) {
      case 'DEPENDS_ON': return 'blue';
      case 'HAS_VULNERABILITY': return 'red';
      case 'EXPOSED_TO': return 'orange';
      case 'MITIGATED_BY': return 'green';
      default: return 'gray';
    }
  };

  const filteredNodes = filter === 'All' ? graphData.nodes : graphData.nodes.filter(node => node.labels.includes(filter));

  const openModal = (node) => {
    setSelectedNode(node);
    setModalIsOpen(true);
  };

  const openLinkModal = (link) => {
    setSelectedLink(link);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedNode(null);
    setSelectedLink(null);
  };

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
        nodeAutoColorBy={getNodeColor}
        nodeLabel={(node) => `
          Name: ${node.properties.assetName || node.properties.vulnName || node.properties.name || ''}
          Type: ${node.labels.join(', ')}
          Risk Score: ${node.properties.riskScore || ''}
        `}
        linkLabel={(link) => link.label}
        linkColor={getLinkColor}
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.005}
        onNodeClick={openModal} // Open modal on node click
        onLinkClick={openLinkModal} // Open modal on link click
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

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Detail Modal">
        <h2>{selectedNode ? selectedNode.properties.assetName || selectedNode.properties.vulnName || selectedNode.properties.name : selectedLink ? selectedLink.label : ''}</h2>
        {selectedNode && (
          <div>
            <p><strong>Type:</strong> {selectedNode.labels.join(', ')}</p>
            <p><strong>Risk Score:</strong> {selectedNode.properties.riskScore || 'N/A'}</p>
            {/* Add more properties as needed */}
          </div>
        )}
        {selectedLink && (
          <div>
            <p><strong>Relationship:</strong> {selectedLink.label}</p>
            {/* Add more link details as needed */}
          </div>
        )}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default GraphVisualization;