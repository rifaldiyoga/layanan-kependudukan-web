import axios from "axios";
import { BASE_URL } from "constants";

const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.request.use(
    function (config) {
        const token = "Bearer " + localStorage.getItem("ACCESS_TOKEN");
        if (token) config.headers.authorization = token;
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axiosClient;
