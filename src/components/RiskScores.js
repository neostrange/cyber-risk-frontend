import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RiskScores = () => {
  const [riskScores, setRiskScores] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/calculate_risk`)
      .then(response => setRiskScores(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Risk Scores</h2>
      <ul>
        {riskScores.map((risk, index) => (
          <li key={index}>
            <strong>{risk.asset}</strong> is exposed to <strong>{risk.threat}</strong> with a risk score of {risk.risk_score}.
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RiskScores;
