import axios from 'axios';

export const axiosInstanace = axios.create({
    baseURL: "https://chat.lsapee.com/api",
    withCredentials: true,
})