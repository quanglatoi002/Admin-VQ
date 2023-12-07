import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

// upload img
const uploadImg = async (data) => {
    console.log(data);
    const response = await axios.post(`${base_url}upload/`, data, config);

    return response.data;
};

//delete img
const deleteImg = async (id) => {
    const response = await axios.delete(
        `${base_url}upload/delete-img/${id}`,

        config
    );
    return response.data;
};

const productService = {
    uploadImg,
    deleteImg,
};

export default productService;
