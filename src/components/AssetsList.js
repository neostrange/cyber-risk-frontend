import React, { useEffect, useState } from "react";

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch("http://172.25.161.89:5000/assets");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Log the fetched data for debugging
        setAssets(data); // Directly set the fetched data
      } catch (error) {
        console.error("Error fetching assets:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dynamic Asset Table</h2>
      {loading ? (
        <p>Loading assets...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : assets.length > 0 ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
              {Object.keys(assets[0]).map((key) => (
                <th
                  key={key}
                  style={{ border: "1px solid #ddd", padding: "8px" }}
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => (
              <tr key={asset.assetID || index}> {/* Use asset.assetID for unique key */}
                {Object.values(asset).map((value, i) => (
                  <td
                    key={i}
                    style={{ border: "1px solid #ddd", padding: "8px" }}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No assets found.</p>
      )}
    </div>
  );
};

export default AssetList;