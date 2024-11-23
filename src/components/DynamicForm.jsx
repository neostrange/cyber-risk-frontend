import React, { useState } from "react";
import { Modal, Form, Input, Button, Col, Row, notification } from "antd";
import { EditOutlined } from "@ant-design/icons";

const DynamicForm = ({ onSubmit, editingItemId, entity, items, apiEndpoint, setItems }) => {
    const [form] = Form.useForm();
    const [isVisible, setIsVisible] = useState(false)
    const [waitingResponse, setWaitingResponse] = useState(false)
    const showModal = () => {
        setIsVisible(true)
        form.resetFields()
    }
    const onClose = () => {
        setIsVisible(false)
        form.resetFields()
    }
    const handleSubmit = async () => {
        // e.preventDefault();
        setWaitingResponse(true)
        const formData = form.getFieldsValue()
        const idKey = Object.keys(formData).find(key => key.includes('id') || key.includes("ID"))
        const method = editingItemId ? "PUT" : "POST";
        const endpoint = editingItemId
            ? `${apiEndpoint}/${formData[idKey]}`
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
                            item[idKey] === formData[idKey] ? updatedItems : item
                        )
                        : [...prevItems, updatedItems]
                );
                notification.success({
                    message: response.status,
                    description: `Record ${editingItemId ? "Updated " : "Created "} ${entity}: ${formData[idKey]}`,
                })
                setWaitingResponse(false)
                form.resetFields()
                onClose()
            } else {
                let error = await response.json()
                console.log("error:", error.error)
                notification.error({
                    message: response.statusText,
                    description: `Error ${error.error}`,
                })
                setWaitingResponse(false)
            }
        } catch (error) {
            notification.error({
                description: `Error saving ${entity}: ${error}`,
            })
            setWaitingResponse(false)
        }
    };

    return (<>
        {editingItemId ? <a onClick={showModal}><EditOutlined/> Update</a> : <Button style={{ padding: "20px 10px", fontWeight: "700" }} type="primary" onClick={showModal}>Add {entity}</Button>}
        <Modal
            width={1024}
            title={`${editingItemId ? "Edit" : "Add"} ${entity}`}
            open={isVisible}
            onCancel={onClose}
            footer={null}
            loading={waitingResponse}

        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={editingItemId ? editingItemId : {}}
            >
                <Row>
                    {items.length > 0 &&
                        Object.keys(items[0]).map((key) => (
                            <Col span={12}>
                                <Form.Item
                                    style={{ height: "46px", marginRight: "5px" }}
                                    key={key}
                                    label={key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                                    name={key}
                                    rules={[{ required: true, message: `Please input ${key}!` }]}
                                >
                                    <Input placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}`} />
                                </Form.Item>
                            </Col>
                        ))}
                </Row>

                <Form.Item key={"submitBtn"}>
                    <Button type="primary" htmlType="submit">
                        {editingItemId ? "Update" : "Create"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </>
    );
};

export default DynamicForm;
