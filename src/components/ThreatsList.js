import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ThreatsList = () => {
  const [threats, setThreats] = useState([]);

  useEffect(() => {
    axios.get('http://172.25.161.89:5000/threats')
      .then(response => setThreats(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Threats</h2>
      <ul>
        {threats.map((threat, index) => (
          <li key={index}>
            <strong>{threat.name}</strong>: {threat.description} (Severity: {threat.severity})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreatsList;
