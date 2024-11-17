import React, { useState } from 'react';
import axios from 'axios';

const LinkAssetThreat = () => {
  const [assetName, setAssetName] = useState('');
  const [threatName, setThreatName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://172.25.161.89:5000/link_asset_threat', {
      asset_name: assetName,
      threat_name: threatName
    })
      .then(response => setMessage(response.data.message))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Link Asset and Threat</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Asset Name" 
          value={assetName} 
          onChange={(e) => setAssetName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Threat Name" 
          value={threatName} 
          onChange={(e) => setThreatName(e.target.value)} 
        />
        <button type="submit">Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LinkAssetThreat;
