import axios from 'axios';

export const axiosInstanace = axios.create({
    baseURL: "http://chat.lsapee.com:5001/api",
    withCredentials: true,
})