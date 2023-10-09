import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";
const login = async (userData) => {
    try {
        const response = await axios.post(
            `${base_url}user/admin-login`,
            userData
        );
        if (response?.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const getOrders = async () => {
    const response = await axios.get(`${base_url}user/getall-orders`, config);

    return response.data;
};

const getOrder = async (id) => {
    const response = await axios.post(`${base_url}user/getorderbyuser/${id}`);

    return response.data;
};

const getMonthlyOrders = async (id) => {
    const response = await axios.get(
        `${base_url}user/getMonthWiseOrderIncome`,
        config
    );

    return response.data;
};

const getYearlyOrders = async (id) => {
    const response = await axios.get(
        `${base_url}user/getYearlyTotalOrders`,
        config
    );

    return response.data;
};

const authService = {
    login,
    getOrders,
    getOrder,
    getMonthlyOrders,
    getYearlyOrders,
};

export default authService;
