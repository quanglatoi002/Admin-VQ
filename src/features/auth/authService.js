import axios from "axios";
import { base_url } from "../../utils/base_url";

// lấy token
const getTokenFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

const config = {
    headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage?.token}`,
        Accept: "application/json",
    },
};

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

const authService = {
    login,
    getOrders,
};

export default authService;
