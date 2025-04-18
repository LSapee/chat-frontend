import axios from 'axios';

export const axiosInstanace = axios.create({
    // baseURL: "http://localhost:5001/api",
    baseURL: "https://chatapi.lsapee.com/api",
    withCredentials: true,
})