import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getNotifications = async () => {
    const response = await axios.get(`${base_url}send-notification/`);

    return response.data;
};

const AddNotifications = async (notifi) => {
    const response = await axios.post(`${base_url}send-notification`, {
        message: notifi.content,
    });
    return response.data;
};

const notificationService = {
    getNotifications,
    AddNotifications,
};

export default notificationService;
