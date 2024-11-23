import { Modal } from "antd";
const { confirm } = Modal;

export const showConfirm = ({ title, icon, content, onOk, onCancel }) => {
    confirm({
        title,
        icon,
        content,
        onOk,
        onCancel,
    });
};