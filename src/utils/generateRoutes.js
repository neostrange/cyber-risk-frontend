import { Link } from "react-router-dom";

export const routes = [
  {
    key: 1,
    label: (
      <Link to="/" >
        Home
      </Link>
    ),
  },
  {
    key: 2,
    label: (
      <Link to="/dashboard" >
        Dashboard
      </Link>
    ),
  },
  {
    key: 3,
    label: (
      <Link to="/assets" >
        Assets
      </Link>
    ),
  },
  {
    key: 4,
    label: (
      <Link to="/threats" >
        Threats
      </Link>
    ),
  },
  {
    key: 5,
    label: (
      <Link to="/vulnerabilities" >
        Vulnerabilities
      </Link>
    ),
  },
  {
    key: 6,
    label: (
      <Link to="/controls" >
        Controls
      </Link>
    ),
  },
  {
    key: 7,
    label: (
      <Link to="/incidents" >
        Incidents
      </Link>
    ),
  },
  {
    key: 8,
    label: (
      <Link to="/link" >
        Link Assets & Threats
      </Link>
    ),
  },
  {
    key: 9,
    label: (
      <Link to="/risks" >
        Risk Scores
      </Link>
    ),
  },
  {
    key: 10,
    label: (
      <Link to="/graph" >
        Graph Visualization
      </Link>
    ),
  },
  {
    key: 11,
    label: (
      <Link to="/link-asset-vulnerability">
        Link Asset & Vulnerability
      </Link>
    ),
  },
];
