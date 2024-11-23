import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CRUDTable from "./components/CRUDTable";
import LinkAssetThreat from "./components/LinkAssetThreat";
import RiskScores from "./components/RiskScores";
import GraphVisualization from "./components/GraphVisualization";
import LinkAssetVulnerability from "./components/LinkAssetVulnerability";
import Dashboard from './components/Dashboard';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import './App.css'; // Ensure you have this CSS file
import { routes } from "./utils/generateRoutes";
const { Header, Content, Footer } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (<>
    <Router>
      <Layout>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div style={{ height: "100%" }}><svg xmlns="http://www.w3.org/2000/svg" width="300" height="90" viewBox="0 0 300 100">
            <g transform="translate(20, 10)">
              <path d="M30 10 L50 20 V40 Q30 70 10 40 V20 Z" fill="#563423" stroke="#2E7D32" stroke-width="2" />
              <text x="17" y="35" fill="#FFFFFF" font-size="12" font-family="Arial" font-weight="bold">CSD</text>
            </g>
            <text  x="80" y="45" fill="#fff" font-size="18" font-family="Arial" font-weight="bold">Cyber Security Dashboard</text>
          </svg></div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{
              color: "white",
              flex: 1,
              minWidth: 0,
            }}
            items={routes}
          />
          {/* <Button>Add Form</Button> */}
        </Header>
      </Layout>
      <Content style={{paddingBottom:"100px"}}>
        <Routes>
          <Route path="/" element={<h1>Welcome to Cybersecurity Risk Management</h1>} />
          <Route path="/assets" element={<CRUDTable entity="Assets" apiEndpoint={`${process.env.REACT_APP_API_URL}/assets`} />} />
          <Route path="/threats" element={<CRUDTable entity="Threats" apiEndpoint={`${process.env.REACT_APP_API_URL}/threats`} />} />
          <Route path="/vulnerabilities" element={<CRUDTable entity="Vulnerabilities" apiEndpoint={`${process.env.REACT_APP_API_URL}/vulnerabilities`} />} />
          <Route path="/controls" element={<CRUDTable entity="Controls" apiEndpoint={`${process.env.REACT_APP_API_URL}/controls`} />} />
          <Route path="/incidents" element={<CRUDTable entity="Incidents" apiEndpoint={`${process.env.REACT_APP_API_URL}/incidents`} />} />
          <Route path="/link" element={<LinkAssetThreat />} />
          <Route path="/risks" element={<RiskScores />} />
          <Route path="/link-asset-vulnerability" element={<LinkAssetVulnerability />} />
          <Route path="/graph" element={<GraphVisualization />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Content>
      <Footer>
        <p>&copy; 2023 Semiatech. All rights reserved.</p>
        <p>
          <a href="/privacy-policy">Privacy Policy</a> |
          <a href="/terms-of-service">Terms of Service</a> |
          <a href="/contact">Contact Us</a>
        </p>
      </Footer>
    </Router>
  </>
  );
}

export default App;