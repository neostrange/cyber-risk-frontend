import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AssetsList = () => {
  const [assets, setAssets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://172.25.161.89:5000/assets')
  .then(response => setAssets(response.data))
  .catch(error => {
    if (!error.response) {
      // Network error
      console.error('Network error:', error);
    } else {
      // Server responded with a status other than 200 range
      console.error('Error response:', error.response);
    }
  });

  }, []);

  return (
    <div>
      <h2>Assets</h2>
      {error ? (
        <div style={{ color: 'red' }}>
          <p>Failed to load assets. Please try again later.</p>
          <p>Error: {error.message}</p>
        </div>
      ) : (
        <ul>
          {assets.map((asset, index) => (
            <li key={index}>
              <strong>{asset.name}</strong>: {asset.description} ({asset.type})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssetsList;
