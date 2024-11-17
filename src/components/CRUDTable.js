import React, { useEffect, useState } from "react";

const CRUDTable = ({ entity, apiEndpoint }) => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({});
  const [editingItemId, setEditingItemId] = useState(null);

  // Fetch items on load
  useEffect(() => {
    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error(`Error fetching ${entity}:`, error));
  }, [apiEndpoint, entity]);

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create or Update an item
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingItemId ? "PUT" : "POST";
    const endpoint = editingItemId
      ? `${apiEndpoint}/${editingItemId}`
      : apiEndpoint;

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const updatedItems = await response.json();
        setItems((prevItems) =>
          editingItemId
            ? prevItems.map((item) =>
                item.id === editingItemId ? updatedItems : item
              )
            : [...prevItems, updatedItems]
        );
        setFormData({});
        setEditingItemId(null);
      }
    } catch (error) {
      console.error(`Error saving ${entity}:`, error);
    }
  };

  // Delete an item
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiEndpoint}/${id}`, { method: "DELETE" });
      if (response.ok) {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error(`Error deleting ${entity}:`, error);
    }
  };

  // Start editing an item
  const handleEdit = (item) => {
    setFormData(item);
    setEditingItemId(item.id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{entity}</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4" }}>
            {items.length > 0 &&
              Object.keys(items[0]).map((key) => (
                <th key={key} style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {key}
                </th>
              ))}
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((value, i) => (
                <td key={i} style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {value}
                </td>
              ))}
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{editingItemId ? "Edit" : "Add"} {entity}</h3>
      <form onSubmit={handleSubmit}>
        {items.length > 0 &&
          Object.keys(items[0]).map((key) => (
            <div key={key} style={{ marginBottom: "10px" }}>
              <label>{key}: </label>
              <input
                type="text"
                name={key}
                value={formData[key] || ""}
                onChange={handleInputChange}
              />
            </div>
          ))}
        <button type="submit">{editingItemId ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default CRUDTable;
