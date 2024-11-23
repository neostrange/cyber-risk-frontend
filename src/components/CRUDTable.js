import React, { useEffect, useState } from "react";
import { Button, Dropdown, notification, Table } from "antd";
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import DynamicForm from "./DynamicForm";
import { showConfirm } from "../utils/showConfirm";

const CRUDTable = ({ entity, apiEndpoint }) => {
  const [items, setItems] = useState([]);
  const [columns, setColumns] = useState([]);

  // Fetch items on load
  useEffect(() => {
    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error(`Error fetching ${entity}:`, error));
  }, [apiEndpoint, entity]);

  // Delete an item
  const handleDelete = async (record, idKey) => {
    try {
      const response = await fetch(`${apiEndpoint}/${record[idKey]}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setItems((prevItems) =>
          prevItems.filter((item) => item[idKey] !== record[idKey])
        );
        notification.success({
          message: response.status,
          description: `Record Deleted ${entity}: ${record[idKey]}`,
        });
      } else {
        notification.error({
          message: response.status,
          description: `${response.statusText.toUpperCase()} ${entity}: ${record[idKey]}`,
        });
      }
    } catch (error) {
      notification.error({
        message: `Error deleting ${entity}: ${record[idKey]}`,
      });
      console.error(`Error deleting ${entity}:`, error);
    }
  };

  const confirmDelete = (record) => {
    const idKey = Object.keys(record).find(
      (key) => key.includes("id") || key.includes("ID")
    );
    showConfirm({
      title:`Delete record from ${entity}`,
      icon: <DeleteOutlined/>,
      content:`Are you sure you want to delete record id: ${record[idKey]}?`,
      onOk:()=>handleDelete(record, idKey)
    })
  };

  useEffect(() => {
    if (items.length) {
      const columns = [
        ...Object.keys(items[0]).map((key) => ({
          title: key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase()), // Format title
          dataIndex: key,
          width: `${key.length}%`,
          key,
        })),
        {
          title: " ",
          key: "set",
          fixed: "right",
          width: "2%",
          align: "center",
          render: (_, record) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "edit",
                      label: (
                        <DynamicForm
                          items={items}
                          entity={entity}
                          apiEndpoint={apiEndpoint}
                          editingItemId={record}
                          setItems={setItems}
                        />
                      ),
                    },
                    {
                      key: "delete",
                      label: (
                        <>
                          <DeleteOutlined /> Delete
                        </>
                      ),
                      danger: true,
                      onClick: () => confirmDelete(record),
                    },
                  ],
                }}
                trigger={["click"]}
              >
                <Button icon={<MoreOutlined />} />
              </Dropdown>
            );
          },
        },
      ];
      setColumns(columns);
    }
  }, [items]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div>
          <h2>{entity}</h2>
        </div>
        <div>
          <DynamicForm
            items={items}
            entity={entity}
            apiEndpoint={apiEndpoint}
            setItems={setItems}
          />
        </div>
      </div>
      <Table
        scroll={{
          x: "max-content", // Enable horizontal scrolling if content overflows
        }}
        dataSource={items.map((item) => ({
          ...item,
          key: item.assetID || Math.random().toString(),
        }))}
        columns={columns}
      />
    </div>
  );
};

export default CRUDTable;
